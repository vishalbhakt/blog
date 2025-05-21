from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseForbidden
from .models import Post, PostImage, ProfileUpdate , Comment
from .forms import PostForm, PostImageFormSet, RegisterForm, ProfileUpdateForm, CommentForm

User = get_user_model()

def post_list(request):
    author_username = request.GET.get('author')
    posts = Post.objects.filter(
        published_date__lte=timezone.now()
    ).order_by('-published_date').select_related(
        'author', 'author__profileupdate'
    )

    if author_username:
        posts = posts.filter(author__username=author_username)

    return render(request, 'post_list.html', {'posts': posts})

@login_required(login_url='/login/')
def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.filter(parent__isnull=True, approved_comment=True)
    new_comment = None
    
    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            parent_id = request.POST.get('parent_id')
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.author = request.user
            
            if parent_id:
                parent_comment = Comment.objects.get(id=parent_id)
                new_comment.parent = parent_comment
            
            new_comment.save()
            comment_form = CommentForm()
            return redirect('post_detail', pk=post.pk)
    else:
        comment_form = CommentForm()
    
    return render(request, 'post_detail.html', {
        'post': post,
        'comments': comments,
        'new_comment': new_comment,
        'comment_form': comment_form
    })

@login_required(login_url='/login/')
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        formset = PostImageFormSet(request.POST, request.FILES)
        if form.is_valid() and formset.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            formset.instance = post
            formset.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm()
        formset = PostImageFormSet()
    return render(request, 'post_edit.html', {'form': form, 'formset': formset})

@login_required(login_url='/login/')
def post_edit(request, pk):
    post = get_object_or_404(Post.objects.prefetch_related('images'), pk=pk)
    if post.author != request.user:
        return HttpResponseForbidden("You are not allowed to edit this post.")
    
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        formset = PostImageFormSet(request.POST, request.FILES, instance=post)
        if form.is_valid() and formset.is_valid():
            post = form.save()
            formset.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
        formset = PostImageFormSet(instance=post)
    return render(request, 'post_edit.html', {'form': form, 'formset': formset})

@login_required(login_url='/login/')
def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if post.author != request.user:
        return HttpResponseForbidden("You are not allowed to delete this post.")
    post.delete()
    messages.success(request, "Post deleted successfully.")
    return redirect('post_list')

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("post_list")
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = RegisterForm()
    return render(request, "register.html", {"form": form})

def user_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect("post_list")
        else:
            messages.error(request, "Invalid credentials")
    return render(request, "login.html")

@login_required(login_url='/login/')
def user_logout(request):
    logout(request)
    return redirect("login")

@login_required
def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(author=user)
    profile = ProfileUpdate.objects.filter(user=user).first()
    return render(request, 'user_profile.html', {
        'profile_user': user,
        'posts': posts,
        'profile': profile,
    })

@login_required
def pf_update(request):
    profile, created = ProfileUpdate.objects.get_or_create(user=request.user)
    if request.method == "POST":
        form = ProfileUpdateForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated successfully!")
            return redirect('user_profile', username=request.user.username)
    else:
        form = ProfileUpdateForm(instance=profile)
    return render(request, 'profiles.html', {'form': form})

def about(request):
    return render(request,'about.html',)

