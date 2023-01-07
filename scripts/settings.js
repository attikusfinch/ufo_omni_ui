function save_data() {
    var user_field = document.getElementById("user-field");
    var password_field = document.getElementById("password-field");
    var ip_field = document.getElementById("ip-field");
    var port_field = document.getElementById("port-field");

    var save_button = document.getElementById("save-button");

    if (user_field.value == "" || password_field.value == "" || ip_field.value == "" || port_field.value == "") {
        alert("Все поля должны быть заполены");
        return;
    }

    localStorage.setItem("user", user_field.value);
    localStorage.setItem("password", password_field.value);
    localStorage.setItem("ip", ip_field.value);
    localStorage.setItem("port", port_field.value);

    alert("Сохранено");
}