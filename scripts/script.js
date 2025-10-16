// 현재 방 상태
let currentRoom = 'north';
const rooms = ['north', 'east', 'south', 'west'];
const roomImages = {
  north: 'img/north/north.png',
  east: 'img/east/east.png',
  south: 'img/south/south.png',
  west: 'img/west/west.png'};


function moveLeft() {
  const currentIndex = rooms.indexOf(currentRoom);
  const newIndex = (currentIndex - 1 + rooms.length) % rooms.length;
  changeRoom(rooms[newIndex]);}

function moveRight() {
  const currentIndex = rooms.indexOf(currentRoom);
  const newIndex = (currentIndex + 1) % rooms.length;
  changeRoom(rooms[newIndex]);}

function changeRoom(newRoom) {
  currentRoom = newRoom;
  document.getElementById('current-room').src = roomImages[newRoom];
  
  // 모든 방의 객체들을 숨김
  document.getElementById('north-objects').style.display = 'none';
  document.getElementById('south-objects').style.display = 'none';
  document.getElementById('east-objects').style.display = 'none';
  document.getElementById('west-objects').style.display = 'none';
  
  // 현재 방의 객체들만 표시
  document.getElementById(newRoom + '-objects').style.display = 'block';}









// ---------- Inventory helpers ----------
function addToInventory(imageSrc) {
  var slots = document.querySelectorAll('#inventory .inventory-slot.empty');
  if (!slots || slots.length === 0) return;
  var slot = slots[0];
  var img = document.createElement('img');
  img.src = imageSrc;
  img.className = 'item-image';
  slot.appendChild(img);
  slot.classList.remove('empty');}

// ---------- Inventory selection (highlight in red) ----------
document.addEventListener('DOMContentLoaded', function() {
  var inventory = document.getElementById('inventory');
  if (!inventory) return;
  inventory.addEventListener('click', function(e) {
    var slot = e.target.closest('.inventory-slot');
    if (!slot) return;
    // 단일 선택 유지
    document.querySelectorAll('#inventory .inventory-slot.selected').forEach(function(s){
      s.classList.remove('selected');
    });
    slot.classList.add('selected');
  });
});



// ----- Overlay helpers -----
function openOverlay(src) {var overlay = document.getElementById('overlay');
  var img = document.getElementById('overlay-image');
  img.src = src;
  overlay.style.display = 'flex';}

function closeOverlay() {var overlay = document.getElementById('overlay');
  var img = document.getElementById('overlay-image');
  img.src = '';
  overlay.style.display = 'none';}

// 오버레이 클릭 진행 로직
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('overlay');
  var overlayImage = document.getElementById('overlay-image');
  if (overlayImage) {
    overlayImage.addEventListener('click', function() {
      // Drawer 로직
      if (window.__overlayContext === 'drawer') {
        if (window.__drawerCompleted) return; // 완료 후 추가 진행 없음
        var next = (window.__drawerStep || 0) + 1;
        if (next > 2) next = 2;
        setDrawerOverlayStep(next);
        return;
      }
      // Closet 로직
      if (window.__overlayContext === 'closet') {
        handleClosetOverlayClick();
        return;
      }
      // Flowerpot 로직
      if (window.__overlayContext === 'flowerpot') {
        handleFlowerpotOverlayClick();
        return;
      }
      // Sink 로직
      if (window.__overlayContext === 'sink') {
        handleSinkOverlayClick();
        return;
      }
      // East Vent 로직
      if (window.__overlayContext === 'eastVent') {
        handleEastVentOverlayClick();
        return;
      }
      // West Vent 로직
      if (window.__overlayContext === 'westVent') {
        handleWestVentOverlayClick();
        return;
      }
      // TV 로직
      if (window.__overlayContext === 'tv') {
        handleTVOverlayClick();
        return;
      }
      // Orgol 로직
      if (window.__overlayContext === 'orgol') {
        handleOrgolOverlayClick();
        return;
      }
    });
  }
});

// ----- Ending sequence -----
function showEnding() {
  var container = document.getElementById('game-container');
  if (!container) return;
  // Create white overlay covering entire screen
  var white = document.createElement('div');
  white.style.position = 'fixed';
  white.style.inset = '0';
  white.style.background = '#ffffff';
  white.style.zIndex = '9999';
  white.style.display = 'flex';
  white.style.alignItems = 'center';
  white.style.justifyContent = 'center';
  document.body.appendChild(white);

  setTimeout(function() {
    // Replace content with ending view
    white.innerHTML = '';
    var wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '16px';

    var img = document.createElement('img');
    img.src = 'img/ending.png';
    img.style.maxWidth = '60vw';
    img.style.maxHeight = '60vh';

    var msg = document.createElement('div');
    msg.textContent = '당신은 무사히 깨어났습니다.';
    msg.style.fontSize = '20px';
    msg.style.color = '#000';
    msg.style.textAlign = 'center';

    wrapper.appendChild(img);
    wrapper.appendChild(msg);
    white.appendChild(wrapper);
  }, 3000);
}

