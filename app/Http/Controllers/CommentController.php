<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Post;

class CommentController extends Controller
{
    use AuthorizesRequests;
    public function store(StoreCommentRequest $request, Post $post)
    {
        $this->authorize('create', Comment::class);

        Comment::create(array_merge(
            $request->validated(),
            [
                'user_id' => auth()->user()->id ?? null,
                'post_id' => $post->id,
            ]
        ));
        return redirect()->route('posts.show', $post);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();
        return redirect()->route('posts.show', $comment->post);
    }
}
