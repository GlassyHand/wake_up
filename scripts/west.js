
function interactBlueFrame() {
    openOverlay('img/west/blueFrame_zoom.png');
  }
  
  function interactGreenFrame() {
    openOverlay('img/west/greenFrame_zoom.png');
  }
  
  function interactRedFrame() {
    openOverlay('img/west/redFrame_zoom.png');
  }
  
  function interactMirror() {
    openOverlay('img/west/mirror_zoom.png');
  }
  
  function interactSink() {
    window.__overlayContext = 'sink';
    openOverlay('img/west/sink_zoom.png');
  }
  
  function interactWestVent() {
    window.__overlayContext = 'westVent';
    if (window.__westVentOpened) {
      openOverlay('img/west/ventOpened_zoom.png');
      return;
    }
    window.__westVentStep = 0;
    openOverlay('img/west/vent_zoom.png');
  }

  function handleWestVentOverlayClick() {
    if (window.__westVentOpened) return;
    var next = (window.__westVentStep || 0) + 1;
    if (next >= 1) {
      openOverlay('img/west/ventOpened_zoom.png');
      window.__westVentOpened = true;
      window.__westVentStep = 1;
      return;
    }
    window.__westVentStep = next;
  }

  function handleSinkOverlayClick() {
    var selectedSlot = document.querySelector('#inventory .inventory-slot.selected');
    var hasEmptyCan = selectedSlot && selectedSlot.querySelector('img') &&
                      selectedSlot.querySelector('img').src.includes('item_wateringcan_empty.png');
    if (!hasEmptyCan) return;
    try {
      var audio = new Audio('sound/sink.mp3');
      audio.play();
    } catch (e) {}
    var img = selectedSlot.querySelector('img');
    if (img) img.src = 'img/item/item_wateringcan_full.png';
  }