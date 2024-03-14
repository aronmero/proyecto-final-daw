<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Follower;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Review;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class NotificationsController extends Controller
{

    /**
     * @OA\Get(
     *     path="/notifications",
     *     summary="Muestra la lista de notificaciones del usuario.",
     *     description="Este método muestra la lista de notificaciones del usuario autenticado.",
     *     tags={"Notifications"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de notificaciones obtenida exitosamente.",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="string", example="ID_de_la_notificación"),
     *                     @OA\Property(property="seen", type="boolean", example=true),
     *                     @OA\Property(property="username", type="string", example="nombre_de_usuario"),
     *                     @OA\Property(property="avatar", type="string", example="avatar_del_usuario"),
     *                     @OA\Property(property="id_link", type="string", example="ID_encriptado_del_elemento_relacionado"),
     *                     @OA\Property(property="type", type="string", example="Tipo_de_notificación"),
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Error al obtener la lista de notificaciones.",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Error: Mensaje de error")
     *         )
     *     ),
     * )
     */
    public function index()
    {
        try {

            $user = Auth::user();

            $notificaciones = $user->notifications()->orderBy('created_at', 'desc')->get();

            foreach ($notificaciones as $notificacion) {

                $user = User::find($notificacion->user_id);
                $notificacion->seen = ($notificacion->seen == 1) ? true : false;

                switch ($notificacion->element_type) {

                    // Verificar si la notificación es un comentario
                    case 'App\\Models\\Comment':

                        $comment = Comment::where('id', '=', $notificacion->element_id)->first();
                        $post = $comment->post;

                        $notificacion->id = Crypt::encryptString($notificacion->id);

                        $notificacion->username = $comment->user->username;
                        $notificacion->avatar = $comment->user->avatar;
                        $notificacion->id_link = Crypt::encryptString($post->id);
                        $notificacion->type = 'Comment';

                        break;

                    // Verificar si la notificación es una review
                    case 'App\\Models\\Review':

                        $review = Review::where('id', '=', $notificacion->element_id)->first();

                        $notificacion->id = Crypt::encryptString($notificacion->id);

                        $notificacion->username = $review->user->username;
                        $notificacion->avatar = $review->user->avatar;
                        $notificacion->id_link = Crypt::encryptString($review->id);
                        $notificacion->type = 'Review';

                        break;

                    // Verificar si la notificación es un follower
                    case 'App\\Models\\Follower':

                        $user = User::where('id', '=', $notificacion->element_id)->first();

                        $notificacion->id = Crypt::encryptString($notificacion->id);

                        $notificacion->username = $user->username;
                        $notificacion->avatar = $user->avatar;
                        $notificacion->type = 'Follower';

                        break;

                    // Verificar si la notificación es sobre un post
                    case 'App\\Models\\Post':

                        $post = Post::where('id', '=', $notificacion->element_id)->first();

                        $notificacion->id = Crypt::encryptString($notificacion->id);

                        $notificacion->username = $post->users->first()->username;
                        $notificacion->avatar = $post->users->first()->avatar;
                        $notificacion->id_link = Crypt::encryptString($post->id);
                        $notificacion->type = 'Post';

                        break;
                }

                unset($notificacion->updated_at);
                unset($notificacion->id);
                unset($notificacion->user_id);
                unset($notificacion->element_id);
                unset($notificacion->element_type);
            }

            return response()->json([
                'status' => true,
                'data' => $notificaciones,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "Error: " . $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Muestra la lista de notificaciones del usuario.
     *
     * @authenticated
     *
     * @response 200 {
     *     "status": false,
     *     "message": "Notificación revisada"
     * }
     *
     * @response 403 {
     *     "status": false,
     *     "message": "Notificación ya revisada"
     * }
     *
     * @response 404 {
     *     "status": false,
     *     "message": "Notificación no encontrada"
     * }
     *
     * @response 500 {
     *     "status": false,
     *     "message": "Error de Decrypt"
     * }
     *
     * @response 500 {
     *     "status": false,
     *     "message": "Error: Mensaje de error"
     * }
     */
    public function check(string $id)
    {
        try {

            try {
                $id = Crypt::decryptString($id);
            } catch (DecryptException $e) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de Decrypt',
                ], 500);
            }

            $notificacion = Notification::where('id', $id)->firstOrFail()->favorito;

            if ($notificacion->seen) {
                return response()->json([
                    'status' => true,
                    'message' => 'Notificación ya revisada',
                ], 403);
            }
            return response()->json([
                'status' => true,
                'message' => 'Notificación revisada',
            ], 200);


        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => "Notificación no encontrada",
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => "Error: " . $e->getMessage(),
            ], 500);
        }
    }
}
