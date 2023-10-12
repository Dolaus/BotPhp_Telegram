const input = document.querySelector("#phone");
    window.intlTelInput(input, {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});

    intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
    fetch("https://ipapi.co/json")
    .then(function (res) {
    return res.json();
})
    .then(function (data) {
    callback(data.country_code);
})
    .catch(function () {
    callback("us");
});
}
});


    $(document).ready(function() {
    $('#myform').validate({
        rules: {
            name: {
                required: true
            },
            productName: {
                required: true
            },
            phone: {
                required: true,
                digits: true
            }
        },
        messages: {
            name: {
                required: "Enter Name"
            },
            productName: {
                required: "Enter Product Name"
            },
            phone: {
                required: "Enter Phone Number",
                digits: "Phone must contain only digits"
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "phone") {
                error.insertAfter("#phone-error");
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#myform").submit(function(event) {
    event.preventDefault();

    var formData = $(this).serialize();
    if ($("#myform").valid()) {

    $.ajax({
    type: "POST",
    url: "send.php",
    data: formData,
    success: function (response) {
    var successMessage = $("#successMessage");

    if (response === 'true') {
    successMessage.text("YES)");
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    myModal.show();
} else {
    successMessage.text("NO(");
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    myModal.show();
}
},
    error: function () {
    alert("Error sending the request to the server.");
}
});
}
});
});
