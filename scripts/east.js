// East Room 상호작용 함수들
function interactCloset() {
  if (window.__closetCompleted) {
    openOverlay('img/east/closetOpened_zoom.png');
    return;
  }
  window.__overlayContext = 'closet';
  window.__closetStep = 0;
  openOverlay('img/east/closet_zoom.png');
}
  
// Closet 오버레이 클릭 처리
function handleClosetOverlayClick() {
  var selectedSlot = document.querySelector('#inventory .inventory-slot.selected');
  var hasHandle = selectedSlot && selectedSlot.querySelector('img') && 
                  selectedSlot.querySelector('img').src.includes('item_handle.png');
  
  if (window.__closetStep === 0 && hasHandle) {
    // Handle을 사용해서 closetHandled1_zoom으로 진행
    openOverlay('img/east/closetHandled1_zoom.png');
    window.__closetStep = 1;
    // Handle 아이템 제거
    if (selectedSlot) {
      selectedSlot.innerHTML = '';
      selectedSlot.classList.add('empty');
      selectedSlot.classList.remove('selected');
    }
    return;
  }
  
  if (window.__closetStep === 1) {
    // closetHandled2_zoom으로 진행
    openOverlay('img/east/closetHandled2_zoom.png');
    window.__closetStep = 2;
    return;
  }
  
  if (window.__closetStep === 2) {
    // closetOpened_zoom으로 진행하고 완료
    openOverlay('img/east/closetOpened_zoom.png');
    window.__closetStep = 3;
    window.__closetCompleted = true;
    // 실제 closet 오브젝트 이미지 변경
    var closetElement = document.getElementById('closet-closed');
    if (closetElement) {
      var img = closetElement.querySelector('img');
      if (img) img.src = 'img/east/closetOpened.png';
    }
    return;
  }
}






  function interactOrgol() {
    // 이미 열렸다면 바로 열린 오버레이를 보여준다
    if (window.__orgolOpened) {
      window.__overlayContext = 'orgol';
      openOverlay('img/east/orgolOpened_zoom.png');
      return;
    }
    // 처음 조사: 닫힌 상태 오버레이 표시 및 컨텍스트 설정
    window.__overlayContext = 'orgol';
    openOverlay('img/east/orgolClosed_zoom.png');
  }
  
  function handleOrgolOverlayClick() {
    // 이미 오픈된 상태면 추가 동작 없음
    if (window.__orgolOpened) return;
    var answer = window.prompt('비밀번호는 무엇인가요?');
    if (answer === '825') {
      // 정답: 상태 업데이트, 오버레이 및 오브젝트 이미지 교체
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
      // 아이템 지급 1회만
      if (!window.__eastVentOpened) {
        addToInventory('img/item/item_wateringcan_empty.png');
      }
      openOverlay('img/east/ventOpened_zoom.png');
      window.__eastVentOpened = true;
      window.__eastVentStep = 2;
      return;
    }
  }
  
  