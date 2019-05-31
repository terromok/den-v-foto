var photo480 = {
  сентября: [[21,6], [20,6], [19,6], [18,3], [17,1]], //на какое число сколько фотографий
}
var photo768 = {
  сентября: [[21,4], [20,5], [19,4], [18,5], [17,4]],
}
var photo320 = {
  сентября: [[21,6], [20,6], [19,6]],
}
var d = 16; //поправка при определении границ с помощью $(window).width()

function screenSize() { //возвращает ширину браузера
  innerWidth = $(window).width();
  if (innerWidth <= (480-d)) {return(320)} else {
    if (innerWidth >= (768-d)) {return(768)} else {return(480)}
  }
}

function buildGallery() {
  // Очищаем страницу
  $('.photo').empty();
  $('.photo2').empty();
  $('.photo768').empty();
  $('.photo2_768').empty();
  //Определяем размер экрана и коллекцию с фотографиями для данного размера
  innerWidth = $(window).width() //наверно, что-то другое надо использовать т.к. на границах не ГУД
  if (innerWidth >= (480-d) && innerWidth < (768-d)) {
    var Collection = photo480; s = 480; var fMax = 11
  };
  if (innerWidth >= (768-d)) {var Collection = photo768; s = 768; var fMax = 5};
  if (innerWidth < (480-d)) {var Collection = photo320; s = 320; var fMax = 6};
  
  // Перебираем фото
  for (const month in Collection) { //перебираем все месяцы
    const daysOfMonth = Collection[month]; //массив дней в данном месяце
    var f =0; //счетчик заполнения блоков для фото
    for (var i = 0; i < daysOfMonth.length; i++) { //перебираем все дни в этом месяце
      var $spanMonth = $('<span />', { //создаем спан с текстом названия месяца
        text: `${month}`,
        class: 'spanMonth',
      });
      var $br = $('<br />', {
         
      });
      var $pDay = $('<p />', {
        text: `${daysOfMonth[i][0]}`, //создаем параграф с текстом числа этого месяца
        class: 'pDay'
      });
      $pDay.append($br); // в параграф вставляем перенос строк
      $pDay.append($spanMonth); //спан вставляем в параграф
      //вставляем блоки с днем и месяцем по своим местам
      if (s != 768) { //т.к. для 768-го нужно заполнить 4 блока
        if (i>0 && f<fMax) {$('.photo').append($pDay)}; //если не последний день из массива
        if (i>0 && f>=fMax) {$('.photo2').append($pDay)}; // если не влезает в первый блок для фото
      } else {
        if (i>0 && f<(fMax)) {$('.photo').append($pDay)}; 
        if (i>0 && f>=fMax && f<=(fMax+8)) {$('.photo2').append($pDay)}; 
        if (i>0 && f>=(fMax+8) && f<(fMax+13)) {$('.photo768').append($pDay)};
        if (i>0 && f>=(fMax+13)) {$('.photo2_768').append($pDay)};
      }
      //if (i=0) {$('.headerImg').append($pDay)}; //последний день надо как-то вывести на хедере
      for (var j = 0; j < daysOfMonth[i][1]; j++) { //в этом дне перебираем все фото
        var $img = $('<img />', {
          src: `img/${s}/${month}/${daysOfMonth[i][0]}/${j+1}.png`, //указываем путь к фото
        });
        var $a = $('<a />', {
          href: '#', //потом в массивах надо будет указать путь к большим изображениям
        }); 
        f++; //наверное, в конец цикла желательно переместить, но пока пусть так :)
        $a.append($img);
        //вставляем фотографии по своим местам
        if (s != 768) {
          if (f>fMax) {$('.photo2').append($a)} else {$('.photo').append($a)}
        } else {
          if (f<=fMax) {$('.photo').append($a)} 
            else {if (f>fMax && f<=(fMax+7)) {$('.photo2').append($a)} 
              else {if (f>fMax+7 && f<=(fMax+12)) {$('.photo768').append($a)} 
                else {$('.photo2_768').append($a)}}}
        }  
      };
    };
  };
  if (s == 320) {  //добавляем по две пустые ссылки для красивого отображения в первыий и во второй блок
    var $a1 = $('<a />', {
      href: '#',
    }); 
    $('.photo').append($a1);
    var $a2 = $('<a />', {
      href: '#',
    });
    $('.photo').append($a2);
    var $a3 = $('<a />', {
      href: '#',
    });
    $('.photo2').append($a3);
    var $a4 = $('<a />', {
      href: '#',
    });
    $('.photo2').append($a4)
  }
  if (s == 480) {            //добавляем одну пустую ссылку во второй блок
    var $a1 = $('<a />', {
      href: '#',
    }); 
    $('.photo2').append($a1);
  }
  if (s == 768) {            //добавляем две пустые ссылки в четвертый блок
    var $a1 = $('<a />', {
      href: '#',
    }); 
    $('.photo2_768').append($a1);
    var $a2 = $('<a />', {
      href: '#',
    });
    $('.photo2_768').append($a2);
  }
  return(s);
       
}
    

(function($) {
  $(function() {
    // Рисуем галерею
    bG = buildGallery(); //возвращает разрешение экрана после отрисовки
    //следим за изменением разрешением экрана
    window.addEventListener("resize", function() {
      sS = screenSize(); //возвращает разрешение при измении
      if (bG != sS) {bG = buildGallery()} // если разрешения разные, то перерисовываем страницу
    }, false)
  });    
})(jQuery);