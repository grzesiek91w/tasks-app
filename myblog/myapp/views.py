from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect

from .forms import UserRegistrationForm

from django.contrib.auth import login, authenticate

from django.contrib.auth import views as auth_views



from django.shortcuts import render, redirect, get_object_or_404

from .models import Post

from .forms import UserRegistrationForm

from django.contrib.auth import login, authenticate

from django.contrib.auth.decorators import login_required

from django.views import View

from django.http import HttpResponse

from django.contrib.auth.views import LogoutView



def register(request):

    if request.method == 'POST':

        form = UserRegistrationForm(request.POST)

        if form.is_valid():

            user = form.save()

            login(request, user)  # Log the user in after registration

            return redirect('post_list')  # Redirect to blog post list

    else:

        form = UserRegistrationForm()

    return render(request, 'register.html', {'form': form})


class CustomLoginView(auth_views.LoginView):

    template_name = 'login.html'

    fields = '__all__'

    redirect_authenticated_user = True


    def get_success_url(self):

        return '/blog'


@login_required

def post_list(request):

    posts = Post.objects.all()

    return render(request, 'post_list.html', {'posts': posts})


@login_required

def post_create(request):

    if request.method == 'POST':

        title = request.POST['title']

        content = request.POST['content']

        post = Post(title=title, content=content, author=request.user)

        post.save()

        return redirect('post_list')

    return render(request, 'post_create.html')


@login_required

def post_detail(request, pk):

    post = get_object_or_404(Post, pk=pk)

    return render(request, 'post_detail.html', {'post': post})

class CatchAllView(View):

    def get(self, request):

        return HttpResponse('This is the catch-all view. No specific route matched.')


class CustomLogoutView(LogoutView):

    template_name = 'accounts/logout.html'

    next_page = '/blog/login/'
