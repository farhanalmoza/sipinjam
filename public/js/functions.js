class Functions {
    getRequest(process, url) {
        $.ajax({
            type: "get",
            url: url,
            beforeSend: function() {
            },
            success: function (response) {
                process.successData = response
            },
            error: function(err) {
                process.errorData = err
            }
        });
    }
}