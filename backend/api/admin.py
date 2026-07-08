from django.contrib import admin
from .models import Settings, Project, ProjectScreenshot, Certificate, Experience, Resume, Training, Achievement, Skill, Education, BlogPost, Message, AnalyticsEvent

class ProjectScreenshotInline(admin.TabularInline):
    model = ProjectScreenshot
    extra = 1
    fields = ('image', 'url')
    readonly_fields = ('url',)

@admin.register(Settings)
class SettingsAdmin(admin.ModelAdmin):
    list_display = ('id',)
    search_fields = ('id',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'isFeatured', 'timeline', 'status')
    list_filter = ('isFeatured', 'status')
    search_fields = ('title', 'slug', 'description', 'overview')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectScreenshotInline]
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'title', 'slug', 'description', 'isFeatured', 'status', 'timeline')
        }),
        ('Media Assets', {
            'fields': ('coverImage', 'coverImageFile', 'demoVideo', 'demoVideoFile', 'architectureImage', 'architectureImageFile')
        }),
        ('Source & Link Info', {
            'fields': ('github', 'liveDemo')
        }),
        ('Architecture Case Study Info', {
            'fields': ('overview', 'problem', 'solution', 'architecture', 'databaseDesign', 'challenges', 'role', 'teamSize')
        }),
        ('Detailed Lists (JSON Arrays)', {
            'fields': ('techStack', 'features', 'futureImprovements', 'highlights', 'whatILearned'),
            'description': 'Enter valid JSON arrays here (e.g. ["Python", "Django"]).'
        }),
    )

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'organization', 'issueDate', 'credentialId')
    list_filter = ('organization', 'issueDate')
    search_fields = ('title', 'organization', 'credentialId')
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'title', 'organization', 'issueDate', 'expiryDate', 'credentialId')
        }),
        ('Validation Links', {
            'fields': ('verificationUrl', 'downloadUrl')
        }),
        ('Media Assets', {
            'fields': ('thumbnail', 'thumbnailFile')
        }),
        ('Skills (JSON Arrays)', {
            'fields': ('skillsCovered',),
            'description': 'Enter valid JSON array (e.g. ["React", "CSS"]).'
        }),
    )

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'startDate', 'endDate')
    list_filter = ('company',)
    search_fields = ('position', 'company', 'responsibilities')
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'company', 'position', 'startDate', 'endDate')
        }),
        ('Assets & Links', {
            'fields': ('companyWebsite', 'logo', 'logoFile', 'certificateUrl', 'recommendationLetter')
        }),
        ('Bullet Points (JSON Arrays)', {
            'fields': ('responsibilities', 'achievements', 'technologies'),
            'description': 'Enter valid JSON arrays here.'
        }),
    )

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('version', 'downloadCount', 'isCurrent', 'created_at')
    list_filter = ('isCurrent',)
    search_fields = ('version',)
    readonly_fields = ('url',)

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('title', 'provider', 'duration')
    list_filter = ('provider',)
    search_fields = ('title', 'provider')
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'title', 'provider', 'duration', 'certificateUrl')
        }),
        ('Details (JSON Arrays)', {
            'fields': ('skillsLearned', 'projectsBuilt')
        }),
    )

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    search_fields = ('title', 'description')
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'title', 'description', 'date', 'proofUrl')
        }),
        ('Media & Links (JSON Arrays)', {
            'fields': ('images', 'relatedProjects')
        }),
    )

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'experienceYears')
    list_filter = ('category',)
    search_fields = ('name', 'category')
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'name', 'category', 'level', 'experienceYears')
        }),
        ('Details (JSON Arrays)', {
            'fields': ('projectsUsedIn',)
        }),
    )

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'startYear', 'endYear', 'cgpa')
    search_fields = ('degree', 'institution')
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'institution', 'degree', 'startYear', 'endYear', 'cgpa')
        }),
        ('Details (JSON Arrays)', {
            'fields': ('courses', 'projects')
        }),
    )

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'category', 'isDraft', 'publishedAt')
    list_filter = ('category', 'isDraft')
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ('General Info', {
            'fields': ('id', 'title', 'slug', 'summary', 'content', 'category')
        }),
        ('Assets', {
            'fields': ('coverImage', 'coverImageFile')
        }),
        ('Meta Info', {
            'fields': ('tags', 'isDraft', 'views', 'publishedAt')
        }),
    )

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name', 'email', 'isRead', 'isImportant', 'created_at')
    list_filter = ('isRead', 'isImportant', 'created_at')
    search_fields = ('subject', 'name', 'email', 'message')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ('eventType', 'entityId', 'created_at')
    list_filter = ('eventType', 'created_at')
    readonly_fields = ('eventType', 'entityId', 'created_at')
