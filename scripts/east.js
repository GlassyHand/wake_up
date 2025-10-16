function interactCloset() {
  if (window.__closetCompleted) {
    openOverlay('img/east/closetOpened_zoom.png');
    return;
  }
  window.__overlayContext = 'closet';
  window.__closetStep = 0;
  openOverlay('img/east/closet_zoom.png');
}
  
function handleClosetOverlayClick() {
  var selectedSlot = document.querySelector('#inventory .inventory-slot.selected');
  var hasHandle = selectedSlot && selectedSlot.querySelector('img') && 
                  selectedSlot.querySelector('img').src.includes('item_handle.png');
  
  if (window.__closetStep === 0 && hasHandle) {
    openOverlay('img/east/closetHandled1_zoom.png');
    window.__closetStep = 1;
    if (selectedSlot) {
      selectedSlot.innerHTML = '';
      selectedSlot.classList.add('empty');
      selectedSlot.classList.remove('selected');
    }
    return;
  }
  
  if (window.__closetStep === 1) {
    openOverlay('img/east/closetHandled2_zoom.png');
    window.__closetStep = 2;
    return;
  }
  
  if (window.__closetStep === 2) {
    openOverlay('img/east/closetOpened_zoom.png');
    window.__closetStep = 3;
    window.__closetCompleted = true;
    var closetElement = document.getElementById('closet-closed');
    if (closetElement) {
      var img = closetElement.querySelector('img');
      if (img) img.src = 'img/east/closetOpened.png';
    }
    return;
  }
}






  function interactOrgol() {
    if (window.__orgolOpened) {
      window.__overlayContext = 'orgol';
      openOverlay('img/east/orgolOpened_zoom.png');
      return;
    }
    window.__overlayContext = 'orgol';
    openOverlay('img/east/orgolClosed_zoom.png');
  }
  
  function handleOrgolOverlayClick() {
    if (window.__orgolOpened) return;
    var answer = window.prompt('3개의 숫자를 입력할 수 있을 것 같다.');
    if (answer === '825') {
      window.__orgolOpened = true;
      openOverlay('img/east/orgolOpened_zoom.png');
      var orgolElement = document.getElementById('orgol-closed');
      if (orgolElement) {
        var img = orgolElement.querySelector('img');
        if (img) img.src = 'img/east/orgolOpened.png';
      }
    } else {
      alert('아무 일도 일어나지 않았다...');
    }
  }
  
  function interactEastVent() {
    window.__overlayContext = 'eastVent';
    if (window.__eastVentOpened) {
      openOverlay('img/east/ventOpened_zoom.png');
      return;
    }
    window.__eastVentStep = 0; // 0: zoom -> 1: wateringcan -> 2: opened
    openOverlay('img/east/vent_zoom.png');
  }
  
  function handleEastVentOverlayClick() {
    if (window.__eastVentOpened) return;
    var next = (window.__eastVentStep || 0) + 1;
    if (next === 1) {
      openOverlay('img/east/ventWateringcan_zoom.png');
      window.__eastVentStep = 1;
      return;
    }
    if (next >= 2) {
      if (!window.__eastVentOpened) {
        addToInventory('img/item/item_wateringcan_empty.png');
      }
      openOverlay('img/east/ventOpened_zoom.png');
      window.__eastVentOpened = true;
      window.__eastVentStep = 2;
      return;
    }
  }
  
  
