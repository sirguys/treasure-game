function checkedit() {
  var oPassword = document.getElementById("oPassword").value;
  var email = "abc@abc.com";
  var nPassword = document.getElementById("nPassword").value;
  var rnPassword = document.getElementById("rnPassword").value;
  if (nPassword != rnPassword) {
    alert('รหัสใหม่ไม่ตรงกัน !');
  }
  /*else if(nPassword.length != 7){
  		alert('รหัสตรงมีจำนวน 7 ตัวอักษร !');
  	}*/
  else {
    auth(email, oPassword, nPassword);
  }
}

function auth(email, oldPassword, newPassword) {
  firebase.auth().signInWithEmailAndPassword(email, oldPassword).then(function(firebaseUser) {
    var user = firebase.auth().currentUser;
    edit(user, newPassword)
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert("รหัสเก่าไม่ถูกต้อง !");
    } else {
      alert("รหัสเก่าไม่ถูกต้อง !");
    }
  });
}

function edit(user, newPassword) {
  user.updatePassword(newPassword).then(function() {
    alert('เปลี่ยนรหัสเรียบร้อยแล้ว !');
  }).catch(function(error) {
    alert('เกิดข้อผิดพลาด !');
    console.log("Error changing password:", error);
  });
}