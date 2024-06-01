$(function () {
  const fade_bottom = 100; // 画面下からどの位置でフェードさせるか(px)
  const fade_move = 200; // どのぐらい要素を動かすか(px)
  const fade_time = 800; // フェードの時間(ms)
  // フェード前のcssを定義
  $(".scroll-fade-up").css({
    opacity: 0,
    transform: `translateY(${fade_move}px)`,
    transition: `${fade_time}ms`,
  });
  // スクロールまたはロードするたびに実行
  $(window).on("scroll load", function () {
    const scroll_top = $(this).scrollTop();
    const scroll_bottom = scroll_top + $(this).height();
    const fade_position = scroll_bottom - fade_bottom;
    $(".scroll-fade-up").each(function () {
      const this_position = $(this).offset().top;
      if (fade_position > this_position) {
        $(this).css({
          opacity: 1,
          transform: "translateY(0)",
        });
      }
    });
  });
});
// JavaScript Document
