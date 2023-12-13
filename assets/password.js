(function() {
  var selectors = {
    loginPopupToggleBtn: '.js-modal-open-login-modal',
    passwordLoginModal: '.password-login-modal'
  };
  var loginPopupToggleBtn = document.querySelector(selectors.loginPopupToggleBtn);
  if(loginPopupToggleBtn) {
    loginPopupToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();

      var passwordLoginModal = document.querySelector(selectors.passwordLoginModal);
      if(passwordLoginModal) {
        passwordLoginModal.classList.toggle('active');
      }
    });
  }

})();
