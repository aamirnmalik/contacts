<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;

class ContactApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        $user = Auth::user();
        return $user?->contacts()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        // purposely sleep for 20 seconds per the requirement
        sleep(20);

        return $request->user()->contacts()->create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return $contact;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreContactRequest $request, Contact $contact)
    {
        $contact->update($request->all());
        return $contact;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact): void
    {
        $contact->delete();
    }
}
