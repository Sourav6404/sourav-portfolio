from django.db import models
import os
import requests
from mimetypes import guess_type
from decouple import config

def upload_to_supabase(file_field_data, bucket_name, storage_path):
    """
    Uploads a file object to Supabase Storage and returns the public URL.
    """
    supabase_url = config('NEXT_PUBLIC_SUPABASE_URL', default=None)
    supabase_key = config('NEXT_PUBLIC_SUPABASE_ANON_KEY', default=None)
    
    if not supabase_url or not supabase_key:
        # Fallback to local development path if environment variables are not loaded
        return f"/media/{storage_path}"
        
    # Standardize URL
    supabase_url = supabase_url.rstrip('/')
    
    # Read binary contents
    file_field_data.seek(0)
    file_data = file_field_data.read()
    
    # Guess mime type
    mime_type, _ = guess_type(storage_path)
    if not mime_type:
        mime_type = 'application/octet-stream'
        
    headers = {
        "Authorization": f"Bearer {supabase_key}",
        "apikey": supabase_key,
        "Content-Type": mime_type,
    }
    
    upload_url = f"{supabase_url}/storage/v1/object/{bucket_name}/{storage_path}"
    
    # Try PUT first (overwrites file if it already exists)
    response = requests.put(upload_url, headers=headers, data=file_data)
    
    if response.status_code == 200:
        return f"{supabase_url}/storage/v1/object/public/{bucket_name}/{storage_path}"
    else:
        # Fallback to POST (creates new object)
        response_post = requests.post(upload_url, headers=headers, data=file_data)
        if response_post.status_code == 200:
            return f"{supabase_url}/storage/v1/object/public/{bucket_name}/{storage_path}"
            
    print(f"Supabase Upload Failed: {response.status_code} - {response.text}")
    return None

class Settings(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    value = models.JSONField()

    class Meta:
        db_table = 'settings'
        verbose_name_plural = "Settings"

    def __str__(self):
        return f"Global Settings ({self.id})"

class Project(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    coverImage = models.TextField()
    coverImageFile = models.ImageField(upload_to='projects/', blank=True, null=True)
    screenshots = models.JSONField(default=list, blank=True)
    demoVideo = models.TextField(blank=True, null=True)
    demoVideoFile = models.FileField(upload_to='projects/videos/', blank=True, null=True)
    architectureImage = models.TextField(blank=True, null=True)
    architectureImageFile = models.ImageField(upload_to='projects/architecture/', blank=True, null=True)
    github = models.CharField(max_length=255)
    liveDemo = models.TextField(blank=True, null=True)
    techStack = models.JSONField(default=list)
    isFeatured = models.BooleanField(default=False)
    overview = models.TextField()
    problem = models.TextField()
    solution = models.TextField()
    architecture = models.TextField()
    databaseDesign = models.TextField()
    challenges = models.TextField()
    features = models.JSONField(default=list)
    futureImprovements = models.JSONField(default=list)
    timeline = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True, null=True)
    teamSize = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)
    highlights = models.JSONField(default=list, blank=True, null=True)
    whatILearned = models.JSONField(default=list, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'projects'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Auto-upload files to Supabase Storage if present
        if self.coverImageFile:
            filename = os.path.basename(self.coverImageFile.name)
            public_url = upload_to_supabase(self.coverImageFile, 'portfolio-media', f"projects/{self.id}_cover_{filename}")
            if public_url:
                self.coverImage = public_url
                
        if self.demoVideoFile:
            filename = os.path.basename(self.demoVideoFile.name)
            public_url = upload_to_supabase(self.demoVideoFile, 'portfolio-media', f"projects/videos/{self.id}_{filename}")
            if public_url:
                self.demoVideo = public_url

        if self.architectureImageFile:
            filename = os.path.basename(self.architectureImageFile.name)
            public_url = upload_to_supabase(self.architectureImageFile, 'portfolio-media', f"projects/architecture/{self.id}_{filename}")
            if public_url:
                self.architectureImage = public_url

        super().save(*args, **kwargs)

class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='screenshot_files')
    image = models.ImageField(upload_to='projects/screenshots/')
    url = models.URLField(blank=True)

    def __str__(self):
        return f"Screenshot for {self.project.title}"

    def save(self, *args, **kwargs):
        if self.image:
            filename = os.path.basename(self.image.name)
            public_url = upload_to_supabase(self.image, 'portfolio-media', f"projects/screenshots/{self.project.id}_{filename}")
            if public_url:
                self.url = public_url
        super().save(*args, **kwargs)

        # Append screenshot URL to parent Project list automatically
        current_list = self.project.screenshots or []
        if self.url and self.url not in current_list:
            current_list.append(self.url)
            self.project.screenshots = current_list
            self.project.save()

class Certificate(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    issueDate = models.CharField(max_length=100)
    expiryDate = models.CharField(max_length=100, blank=True, null=True)
    credentialId = models.CharField(max_length=255)
    verificationUrl = models.TextField()
    downloadUrl = models.TextField(blank=True, null=True)
    thumbnail = models.TextField()
    thumbnailFile = models.ImageField(upload_to='certificates/', blank=True, null=True)
    skillsCovered = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'certificates'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.thumbnailFile:
            filename = os.path.basename(self.thumbnailFile.name)
            public_url = upload_to_supabase(self.thumbnailFile, 'portfolio-media', f"certificates/{self.id}_{filename}")
            if public_url:
                self.thumbnail = public_url
        super().save(*args, **kwargs)

class Experience(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    company = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    startDate = models.CharField(max_length=100)
    endDate = models.CharField(max_length=100)
    responsibilities = models.JSONField(default=list)
    achievements = models.JSONField(default=list)
    technologies = models.JSONField(default=list)
    companyWebsite = models.TextField(blank=True, null=True)
    logo = models.TextField(blank=True, null=True)
    logoFile = models.ImageField(upload_to='experiences/', blank=True, null=True)
    certificateUrl = models.TextField(blank=True, null=True)
    recommendationLetter = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'experiences'

    def __str__(self):
        return f"{self.position} at {self.company}"

    def save(self, *args, **kwargs):
        if self.logoFile:
            filename = os.path.basename(self.logoFile.name)
            public_url = upload_to_supabase(self.logoFile, 'portfolio-media', f"experiences/logos/{self.id}_{filename}")
            if public_url:
                self.logo = public_url
        super().save(*args, **kwargs)

class Resume(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    version = models.CharField(max_length=50)
    url = models.TextField()
    file = models.FileField(upload_to='resumes/', blank=True, null=True)
    downloadCount = models.IntegerField(default=0, db_column='downloadCount')
    isCurrent = models.BooleanField(default=False, db_column='isCurrent')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'resumes'

    def __str__(self):
        return f"Resume {self.version}"

    def save(self, *args, **kwargs):
        if self.file:
            filename = os.path.basename(self.file.name)
            public_url = upload_to_supabase(self.file, 'portfolio-media', f"resumes/{self.version}_{filename}")
            if public_url:
                self.url = public_url
        super().save(*args, **kwargs)

class Training(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)
    duration = models.CharField(max_length=100)
    skillsLearned = models.JSONField(default=list)
    certificateUrl = models.TextField(blank=True, null=True)
    projectsBuilt = models.JSONField(default=list)

    class Meta:
        db_table = 'trainings'

    def __str__(self):
        return self.title

class Achievement(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.CharField(max_length=100)
    images = models.JSONField(default=list)
    proofUrl = models.TextField(blank=True, null=True)
    relatedProjects = models.JSONField(default=list, blank=True, null=True)

    class Meta:
        db_table = 'achievements'

    def __str__(self):
        return self.title

class Skill(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.IntegerField()
    experienceYears = models.IntegerField()
    projectsUsedIn = models.JSONField(default=list)

    class Meta:
        db_table = 'skills'

    def __str__(self):
        return self.name

class Education(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    startYear = models.CharField(max_length=100)
    endYear = models.CharField(max_length=100)
    cgpa = models.CharField(max_length=50)
    courses = models.JSONField(default=list)
    projects = models.JSONField(default=list)

    class Meta:
        db_table = 'education'
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"

class BlogPost(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    summary = models.TextField()
    content = models.TextField()
    coverImage = models.TextField()
    coverImageFile = models.ImageField(upload_to='blogs/', blank=True, null=True)
    category = models.CharField(max_length=100)
    tags = models.JSONField(default=list)
    isDraft = models.BooleanField(default=False)
    views = models.IntegerField(default=0)
    publishedAt = models.DateTimeField()

    class Meta:
        db_table = 'blog_posts'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.coverImageFile:
            filename = os.path.basename(self.coverImageFile.name)
            public_url = upload_to_supabase(self.coverImageFile, 'portfolio-media', f"blogs/{self.slug}_{filename}")
            if public_url:
                self.coverImage = public_url
        super().save(*args, **kwargs)

class Message(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    isRead = models.BooleanField(default=False)
    isImportant = models.BooleanField(default=False)
    isArchived = models.BooleanField(default=False)
    replyText = models.TextField(blank=True, null=True, db_column='replyText')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'messages'

    def __str__(self):
        return f"{self.subject} from {self.name}"

class AnalyticsEvent(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    eventType = models.CharField(max_length=100, db_column='eventType')
    entityId = models.CharField(max_length=100, db_column='entityId', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'analytics_events'

    def __str__(self):
        return f"Event {self.eventType} at {self.created_at}"
