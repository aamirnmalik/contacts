<?php

namespace App\Console\Commands;

use App\Events\ContactUpdatedEvent;
use App\Models\Contact;
use Illuminate\Console\Command;

class UpdateContact extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-contact {contact} {first-name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $contact = Contact::findOrFail($this->argument('contact'));

        $contact->update([
            'first_name' => $this->argument('first-name'),
        ]);

        ContactUpdatedEvent::dispatch($contact);
    }
}
