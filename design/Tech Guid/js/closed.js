// JavaScript Document

//チェックボックスのチェックを外す
$(function() {
  $('#g_nav li>a').click(function() {
    $('#menu-btn-check').removeAttr('checked').prop('checked', false).change();
  });
});