<script lang="ts"></script>

<div class="logo-mark" aria-hidden="true">
  <span class="logo-mark__fold"></span>
  <span class="logo-mark__stem"></span>
</div>

<style>
  .logo-mark {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(255, 246, 214, 1) 0%, rgba(230, 184, 92, 1) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.72),
      0 10px 18px rgba(186, 145, 70, 0.18);
    overflow: hidden;
  }

  .logo-mark__fold {
    position: absolute;
    inset: 7px 9px auto auto;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.75);
    transform: skew(-18deg) rotate(18deg);
    filter: blur(0.1px);
  }

  .logo-mark__stem {
    position: absolute;
    left: 12px;
    top: 8px;
    width: 18px;
    height: 24px;
    border-left: 5px solid rgba(80, 57, 30, 0.88);
    border-top: 5px solid rgba(80, 57, 30, 0.88);
    border-top-left-radius: 12px;
    transform: skewX(-14deg);
  }
</style>
