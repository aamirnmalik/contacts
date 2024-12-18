<?php

use App\Models\Contact;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('App.Models.Contact.{id}', function ($user, $contactId) {
    // TODO: Implement this
    return true;
//    return (int) $user->id === Contact::findOrFail($contactId)->user->id;
});

Broadcast::channel('App.Models.Contacts', function ($user) {
    return true;
//    return (int) $user->id === Contact::findOrFail($contactId)->user->id;
});
