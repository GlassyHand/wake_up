
function interactDrawer() {
    if (window.__drawerCompleted) {
      openOverlay('img/south/drawer_opened.png');
      return;
    }
    window.__overlayContext = 'drawer';
    window.__drawerStep = 0; // 0: zoom -> 1: opened_controller -> 2: opened & item
    setDrawerOverlayStep(0);
  }
  
// ---------- Drawer overlay progression ----------
function setDrawerOverlayStep(step) {
  var overlay = document.getElementById('overlay');
  var img = document.getElementById('overlay-image');
  if (!overlay || !img) return;
  if (step === 0) {
    img.src = 'img/south/drawer_zoom.png';
  } else if (step === 1) {
    img.src = 'img/south/drawer_opened_controller.png';
  } else if (step === 2) {
    img.src = 'img/south/drawer_opened.png';
    // 아이템 지급 1회만
    if (!window.__drawerCompleted) {
      addToInventory('img/item/item_controller.png');
      window.__drawerCompleted = true;
    }
  }
  overlay.style.display = 'flex';
  window.__drawerStep = step;
}






  function interactHandle() {
    addToInventory('img/item/item_handle.png');
    var handle = document.getElementById('handle');
    if (handle) handle.style.display = 'none';
  }
  
  function interactTV() {
    window.__overlayContext = 'tv';
    if (window.__tvOn) {
      openOverlay('img/south/TVon_zoom.png');
      return;
    }
    openOverlay('img/south/TV_zoom.png');
  }
  
  function handleTVOverlayClick() {
    if (window.__tvOn) return;
    var selectedSlot = document.querySelector('#inventory .inventory-slot.selected');
    var hasController = selectedSlot && selectedSlot.querySelector('img') &&
                        selectedSlot.querySelector('img').src.includes('item_controller.png');
    if (hasController) {
      window.__tvOn = true;
      openOverlay('img/south/TVon_zoom.png');
    }
  }