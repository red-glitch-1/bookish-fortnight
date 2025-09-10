<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $this->authorize('viewAny', Post::class);

        return Inertia::render('posts/index', [
            'posts' => Post::with('user', 'comments')->get(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Post::class);

        return Inertia::render('posts/create');
    }

    public function store(StorePostRequest $request)
    {
        $this->authorize('create', Post::class);

        $post = Post::create(array_merge(
            $request->validated(),
            ['user_id' => auth()->user()->id]
        ));
        return redirect()->route('posts.show', $post);
    }

    public function show(Post $post)
    {
        $this->authorize('view', $post);

        return Inertia::render('posts/show', [
            'post' => $post->load('comments', 'user', 'comments.user'),
        ]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        return Inertia::render('posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $this->authorize('update', $post);

        $post->update($request->validated());
        return redirect()->route('posts.show', $post);
    }


    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        $post->comments()->delete();
        $post->delete();
        return redirect()->route('posts.index');
    }
}
