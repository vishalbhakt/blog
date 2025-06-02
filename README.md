# Djongo Blog - A Modern Blogging Platform

![Djongo Blog Screenshot](static/images/screenshot.png)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Features
- **User Authentication**: Secure registration and login system with profile management
- **Blog Posts**: Create, edit, and delete blog posts with rich text content
- **Image Uploads**: Support for multiple images per post with captions
- **Comments System**: Nested comments with @mentions and reply functionality
- **User Profiles**: Detailed profiles with avatars and personal information
- **Responsive Design**: Fully responsive layout for all device sizes

### Advanced Features
- **Real-time Mentions**: Mention users in comments with profile links
- **Image Previews**: Live previews when uploading profile pictures
- **Password Toggle**: Show/hide password fields for better UX
- **Floating Action Button**: Quick access to create new posts
- **Pagination**: For blog post listings
- **Featured Posts**: Highlight special content on the homepage

## Installation

### Prerequisites
- Python 3.8+
- PostgreSQL (recommended) or SQLite
- Node.js (for optional frontend assets)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/djongo-blog.git
   cd djongo-blog
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

## Configuration

### Environment Variables
- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to `True` for development
- `DATABASE_URL`: Database connection URL
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `MEDIA_ROOT`: Path to media files directory
- `MEDIA_URL`: URL to serve media files

### Settings
Key settings can be adjusted in `settings.py`:
- Timezone and language
- Static and media files configuration
- Authentication backends
- Email settings

## Usage

### Creating Posts
1. Log in to your account
2. Click the "+" floating action button or navigate to "New Post"
3. Fill in the title and content
4. Upload images (optional)
5. Click "Publish"

### Managing Comments
- Reply to comments using the "Reply" button
- Mention users with @username (creates a link to their profile)
- Nested replies create threaded conversations

### User Profiles
- Edit your profile from the dropdown menu
- Upload a profile picture
- Add personal information and social links

## Project Structure

```
djongo-blog/
├── blog/                      # Main app directory
│   ├── migrations/            # Database migrations
│   ├── static/                # Static files (CSS, JS, images)
│   ├── templates/             # HTML templates
│   │   ├── accounts/          # Authentication templates
│   │   ├── blog/              # Blog post templates
│   │   └── base.html          # Base template
│   ├── admin.py               # Admin configuration
│   ├── apps.py                # App config
│   ├── forms.py               # Form definitions
│   ├── models.py              # Database models
│   ├── urls.py                # URL routing
│   └── views.py               # View functions
├── media/                     # User-uploaded files
├── static/                    # Collected static files
├── manage.py                  # Django management script
└── requirements.txt           # Python dependencies
```

## Customization

### Theme Customization
Edit `static/css/style.css` to modify:
- Color scheme (update CSS variables)
- Typography
- Layout and spacing
- Component styles

### Template Customization
All templates can be found in `templates/`:
- `base.html`: Base template with navigation and footer
- `post_list.html`: Blog post listing page
- `post_detail.html`: Individual post view
- `post_edit.html`: Post creation/editing form
- `user_profile.html`: User profile page

## Deployment

### Recommended Stack
- Web Server: Nginx
- Application Server: Gunicorn
- Database: PostgreSQL
- Storage: AWS S3 or similar for media files

### Deployment Steps
1. Set up your production environment variables
2. Configure your web server (Nginx/Apache)
3. Set up static files:
   ```bash
   python manage.py collectstatic
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start your application server:
   ```bash
   gunicorn djongo_blog.wsgi:application
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by Vishal Kumar Bhakt**  
[GitHub](https://github.com/vishalbhakt) | [LinkedIn](https://www.linkedin.com/in/vishal-kumar-bhakt/)
