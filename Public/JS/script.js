function match() {
    a = document.getElementById("Upass").value;
    b = document.getElementById("Upass1").value;
    if (a == b) {
        if (a < 8) {
            document.write("Password is too short");
        } else if (a > 15) {
            document.write("Password is too long");
        } else {
            return true;
        }
    } else {
        alert("Password should be same.");
    }
}