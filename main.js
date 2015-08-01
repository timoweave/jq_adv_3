
var all_contacts = [
    // { first_name:"", last_name:"", bio_text:"", list_item:"" }
    { first_name: "Karen", last_name:"Durham",
      bio_text: "teacher, Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", list_item:undefined },
    { first_name: "Heidi", last_name:"Flite", bio_text: "dancer, Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", list_item:undefined }




];

$(document).ready(function(){

    function get_or_new_item(user) { // retrieve or create
	if (user === undefined) { return undefined; }
	if (user.list_item) { return user.table_row; }

	var name = $('<h2>').html(user.first_name + " " + user.last_name);
	var desc = $('<p>').html(user.bio_text);
	var item = $('<li>').append(name, desc);
	return item;
    }

    function list_contacts(items, contacts) { // list of unlisted contacts to the table
	if ((items === undefined) || (contacts === undefined)) { return; }

	contacts.map(function(user) {
	    if (user.list_item === undefined) {
		var item = get_or_new_item(user);
		if (item) {
		    user.list_item = item;
		    items.prepend(item);
		}
	    }
        });
    }

    function new_contact(form) {
	if (form === undefined) { return undefined; }
	var labels = form.children('label');
	if (labels === undefined) { return undefined; }

	var first = labels.children('input[name="first_name"]');
	var last = labels.children('input[name="last_name"]');
	var desc = labels.children('textarea');

	var user = {};
	user.first_name = first.val();
	user.last_name = last.val();
	user.bio_text = desc.val();

	// TBD: validation

	first.val("");
	last.val("");
	desc.val("");
	return user;
    }

    $('#new-contact input[type="submit"]').on('click', function() {
        var form = $(this).parent();
        var user = new_contact(form);
        if (user) {
	    all_contacts.push(user);

	    var list = $("#contact-list");
	    list_contacts(list, all_contacts);
        }
        return false; // no form action, stay with this page.
    });

    list_contacts($("#contact-list"), all_contacts);
});
