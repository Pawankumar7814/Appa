<%- include("../partial/header.ejs") %> <
main >
    <
    section >
    <
    div class = "container card " >
    <
    form class = "row g-3" >
    <
    div class = "container-fluid " >
    <
    h2 >
    <
    center >
    <
    i > About Me < /i> <
    /center> <
    /h2> <
    /div> <
    div class = "col-md-12" >
    <
    label
for = "Uname"
class = "form-label" > Name: -<%= data.UFname %>
<%= data.ULname %> < /label> <
/div> <
div class = "col-md-6" >
    <
    label
for = "Uemail"
class = "form-label" > Email: -<%= data.UEmail %> < /label> <
    /div> <
    div class = "col-md-6" >
    <
    label
for = "inputcontact"
class = "form-label" > Contact No: -<%= data.UPhone %> < /label> <
    /div> <
    div class = "col-12" >
    <
    label
for = "inputHopuseNumber"
class = "form-label" > Address < /label>
<%= data.Address.HouseNo %> <
bR >
    <%= data.Address.StreetNo %> <
    bR >
    <%= data.Address.City %> <
    bR >
    <%= data.Address.State %> <
    bR >
    <%= data.Address.PIN %> <
    bR >
    <%= data.Address.Country %> <
    bR >
    <%= data.Address.NearBy %> <
    bR >
    <
    /div> <
    div class = "col-12 text-center" >
    <
    a href = "/User/Edit"
class = "btn btn-sm" > Edit < /a> <
    /div> <
    /form> <
    /div> <
    /section> <
    /main>
<%- include("../partial/footer.ejs") %>
},
State: {
        type: String,
        default: " "
    },
    PIN: {
        type: Number,
        default: " "
    },
    Country: {
        type: String,
        default: " "
    },
    NearBy: {
        type: String,
        default: " "
    },
    Address_UUID: {
        type: String
    }
}
},
U_added_date: {
        type: Date,
        default: Date.now
    },
    U_Last_log_inDate: {
        type: Date
    }
});

module.exports = User = mongooes.model('user', user);