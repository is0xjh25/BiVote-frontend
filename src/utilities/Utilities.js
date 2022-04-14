/* Validation */
const handleOnValidation = (type, info) => {

  let formIsValid = true;
  let alertMessage = "";
  let check = {};

  switch(type) {
    case 'main':
      if (!info.password) {
        alertMessage = "password cannot be empty";
        formIsValid = false;
      } else if (!info.username) {
        alertMessage = "username cannot be empty";
        formIsValid = false;
      };
      break;
    case 'rescue':
      check = emailValidation(info.email);
      if (!check.valid) {
        alertMessage = check.message;
        formIsValid = false;
      } 
      break;
    case 'register':
      check = passwordValidation('create', info.password, info.passwordTwo);
      if (!check.valid) {
        alertMessage = check.message;
        formIsValid = false;
      }
      check = usernameValidation(info.username);
      if (!check.valid) {
        alertMessage = check.message;
        formIsValid = false;
      }  
      check = emailValidation(info.email);
      if (!check.valid) {
        alertMessage = check.message;
        formIsValid = false;
      } 
      break;
    case 'profile':
      check = passwordValidation('update', info.password, info.passwordTwo);
      if (!check.valid) {
        alertMessage = check.message;
        formIsValid = false;
      }
      check = emailValidation(info.email);
      if (!check.valid) {
        alertMessage = check.message;
        formIsValid = false;
      }  
      break;
    default:
      break;
  }
  
  return {valid: formIsValid, message: alertMessage};
};

function usernameValidation (u) {
  
  if (!u) {
    return {valid: false, message: "username cannot be empty"};
  } else if (typeof u !== 'undefined') {
    let regex = /^[A-Za-z\d,-]{1,12}$/;
    if (!regex.test(u)) {
      return {valid: false, message: "username should have not greater than 12 characters without special character except '-'"}; 
    } 
  }

  return {valid: true, message: "valid username"};
}

function emailValidation (e) {
  
  if (!e) {
    return {valid: false, message: "email cannot be empty"};
  } else if (typeof e !== 'undefined') {
    let regex = /[\w+\-.]+@[a-z\d]+(\.[a-z\d]+)*\.[a-z]+/;
    if (!regex.test(e)) {
      return {valid: false, message: "invalid email"}; 
    }
  }

  return {valid: true, message: "valid email"};
}

function passwordValidation (type, p1, p2) {
  if (type === 'create') {
    if (!p1 || !p2) {
      return {valid: false, message: "password cannot be empty"};
    } else if (typeof p1 !== 'undefined' && typeof p2 !== 'undefined') {
      let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
      if (!regex.test(p1)) {
        return {valid: false, message: "password needs to between 8 to 32 characters mixture of letters and numbers"};
      } else if ( p1 !== p2) {
        return {valid: false, message: "password do not match"};
      };
    };
  } else if (type === 'update') {
    if (!p1 || !p2) {
      return {valid: true, message: "valid password"};
    } else if (typeof p1 !== 'undefined' && typeof p2 !== 'undefined') {
      let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
      if (!regex.test(p1)) {
        return {valid: false, message: "password needs to between 8 to 32 characters mixture of letters and numbers"};
      } else if ( p1 !== p2) {
        return {valid: false, message: "password do not match"};
      };
    };
  }

  return {valid: true, message: "valid password"};
}

/* Timer */
function countDown(endTime) {
  
	let now = new Date().getTime();
  let distance = new Date(endTime).getTime() - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) return 'Vote is CLOSED';
 	return days + "D " + hours + "H "+ minutes + "M " + seconds + "S ";
};

export {
  handleOnValidation,
	countDown,
};