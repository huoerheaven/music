$(function(){
// 	var audio=$('#audio').get(0);
// 	var $audio=$('#audio');

// 	//播放按钮
// 	$(".bar-op .play").on('click',function(){
//         if(audio.paused){
//             audio.play();
//         }else{
//             audio.pause();
//         };
// 	})
// 	$audio.on('play',function(){
// 		$('.bar-op .play').addClass('pause');
// 	})
// 	$audio.on('pause',function(){
// 		$('.bar-op .play').removeClass('pause');
// 	})

// 	$(document).on('keyup',function(e){
// 		if(e.shiftKey&&e.keyCode===80){
// 			$(".bar-op .play").trigger('click');
// 		}
// 	})


// 	// 点击设置音量
// 	$('.volume-regulate').on('click',function(e){
// 		audio.volume=e.offsetX/$(this).width();
// 	}) 
// 	// 点击静音
// 	$(".volome-mute").on("click",function(){
//           if(!$(this).attr('ov')){
//           	$(this).attr('ov',audio.volume);
//           	audio.volume=0;
// 		  }else{
// 		  	audio.volume=$(this).attr('ov');
// 		  	$(this).removeAttr('ov');
// 		 }
// 	})	

//     // 调节音量设置界面
// 	$audio.on('volumechange',function(){
// 		if(audio.volume===0){
// 			$('.volome-mute').addClass('jingyin');
// 		}else{
// 			$('.volome-mute').removeClass('jingyin');
// 		}
// 		var w=audio.volume*$('.volume-regulate').width();
// 		$('.volume-regulate .volume-bar').width(w)
// 		$('.volume-regulate .volume-op').css({left:w-3})
// 	})
// 	$('.volume-regulate .volume-op').on('click',function(e){
//          e.stopPropagation();

// 	})
// 	// 音量拖动
// 	$('.volume-regulate .volume-op').on('mousedown',function(e){
// 		e.preventDefault();	
// 		$('.volume-regulate').addClass('moving')
// 		//$(this).closest('.volume-regulate').addClass('moving')
//         $(document).on('mousemove',function(e){
// 	    // var w=(e.clientX-$('.volume-regulate').offset().left)/$('.volume-regulate').width();
// 	    // if( w >= 0 && w <= 1){audio.volume=w};
// 	    var v=(e.clientX-$('.volume-regulate').offset().left)/$('.volume-regulate').width();
// 	    v=(v>1)?1:v;
// 	    v=(v<0)?0:v;
// 	    audio.volume=v
// 	})
//         $(document).on('mouseup',function(){
//         	$('.volume-regulate').removeClass('moving')
//         	$(document).off('mousemove')
//         })

// })
// 列表

     var musics=[
      {path:'media/曾子岚 - 青春的颜色.mp3',name:'青春的颜色',artistan:'曾子岚',duration:'03:18'},
      {path:'media/陈奕迅 - 红玫瑰.mp3',name:'红玫瑰',artistan:'陈奕迅',duration:'03:15'},
      {path:'media/蒙面哥 - 一亿个伤心.mp3',name:'一亿个伤心',artistan:'蒙面哥',duration:'03:18'},
      {path:'media/孙露 - 让我一次爱个够.mp3',name:'让我一次爱个够',artistan:'孙露',duration:'04:13'},
      {path:'media/刘思涵 - 走在冷风中 (Bonus Track).mp3',name:'走在冷风中 (Bonus Track)',artistan:'刘思涵',duration:'02:10'},
      {path:'media/陶喆 - 寂寞的季节.mp3',name:'寂寞的季节',artistan:'陶喆',duration:'05:10'},
      {path:'media/中島美嘉 - Fighter.mp3',name:'Fighter',artistan:'中島美嘉',duration:'03:20'},
      {path:'media/周杰伦-一路向北.mp3',name:'一路向北',artistan:'周杰伦',duration:'03:20'}
     ]
     var $num=$('.open-list div')
     var currentIndex;
     $(musics).each(function(index,el){
     $('<li data-id='+index+'><span class="song-name" >'+el.name+'</span><span class="artistan" alt="aaaaa">'+el.artistan+'</span><span class="duration">'+el.duration+'</span><div class="opration"><div class="like"></div><div class="share"></div><div class="shoucang"></div><div class="delete"></div></div></li>').appendTo('.play-list ul')
     $num.html(musics.length);
     })

     // 点击列表歌曲
     // $('.play-list li').on('click',function(){
     //  $('.play-list li').removeClass("playing");
     //  $(this).addClass('playing');
     //  currentIndex=$(this).attr('data-id');
     //  audio.src=musics[currentIndex].path;
     //  audio.play();
     // })

    $('.play-list li').on('click',function(e){
      e.preventDefault();
      //currentIndex=parseInt($(this).attr('data-id'));
      currentIndex=$(this).index();
      audio.src=musics[currentIndex].path;
      audio.play();
     })
     // 处理列表界面
     $('#audio').on('play',function(){
      $('.play-list li').removeClass("playing");//首先全部移除
      $('.play-list li').eq(currentIndex).addClass('playing');//找到点击的那个添加class
      var v=musics[currentIndex];
      $('.mini-player #music-name').text(v.name);
      $('.mini-player .singer').text(v.artistan);
      $('.mini-player .music-date').text(v.duration);
     })

     //切歌
     var $previous=$('.mini-player .previous');
     var $next=$('.mini-player .next');
     $next.on('click',function(){
      //列表播放   ordered_bt  unordered_bt  cycle_single_bt  cycle_bt
          if($change.hasClass('ordered_bt')){
          currentIndex+=1;      
          }if($change.hasClass('unordered_bt')){
          currentIndex=Math.floor(Math.random()*musics.length)
          } 
          if($change.hasClass('cycle_single_bt')){

          }
          if($change.hasClass('cycle_bt')){
            currentIndex+=1;            
          }
     if(!currentIndex||currentIndex>=musics.length){
        currentIndex=0;
      }
       audio.src=musics[currentIndex].path;
       audio.play();
     })
      $previous.on('click',function(){
      
      if(!currentIndex||currentIndex<=0){
        currentIndex=musics.length;
      }
      currentIndex -=1;
       audio.src=musics[currentIndex].path;
       audio.play();
     })

    // 在播放完成之后
    $('#audio').on('ended',function(){
      $next.trigger('click');
      console.log(currentIndex);
    })
    
  // 清空单个
    var $del=$('.play-list .delete')
    $del.on('click',function(e){
      e.stopPropagation();
      var i=$('.play-list .delete').index(this);
      console.log(i);
      $(this).closest('li').remove();   //删除最靠近他的父元素
      musics.splice(i,1)               //删除数据
        audio.src='';                   //清理地址
        $play.removeClass('pause')         //还原播放按钮
        $current.width(0);                  //清理音乐播放条进度
        $playop.css({left:-$playop.width()/2})
        $('.play-list li').removeClass("playing");    //清理其他歌曲的点击效果
        $num.html(musics.length);                     //设置列表个数
        $('.mini-player #music-name').text('听我想听的歌');    //清理歌曲信息
        $('.mini-player .singer').text('qq音乐');
        $('.mini-player .music-date').text('....');    

    })


     //清空整个列表
     var $clearall=$('.play-list .clear-list');
     var $ul=$('.play-list  ul')
     $clearall.on('click',function(){
       $del.trigger('click'); 
     })
      

      //播放模式
      var $order=$('.playbar_select .ordered_bt');
      var $unorder=$('.playbar_select .unordered_bt');
      var $single=$('.playbar_select .cycle_single_bt');
      var $cycle=$('.playbar_select .cycle_bt');
      var $select=$('.playbar_select')
      var $change=$(".bar-op .next + div ")
      $change.on('click',function(e){
           e.preventDefault;
           $select.css('display','block');
      })
      $order.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('ordered_bt');

      })
      $unorder.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('unordered_bt');

      })
      $single.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('cycle_single_bt');

      })
      $cycle.on('click',function(){
        $change.removeClass();
        $select.css('display','none');
        $change.addClass('cycle_bt');

      })










//   // 播放条
      
      var audio=$('#audio').get(0);
      var $audio=$('#audio');
      var $play=$('.mini-player .play');
      var $mute=$('.volome-mute');
      var $vre=$('.volume-regulate');
      var $vbar=$('.volume-bar');
      var $vop=$('.volume-op');
      var w=$vre.width();
      // 点击开始播放
      $play.on('click',function(){
        if(currentIndex==undefined){
          currentIndex=0;
          audio.src=musics[currentIndex].path;
        }
      	if(audio.paused){
          audio.src=musics[currentIndex].path;
      		audio.play();
      	}else{
      		audio.pause();
      	}
      	
      })
      $audio.on('play',function(){
         $play.addClass('pause') 
      })
      $audio.on('pause',function(){
         $play.removeClass('pause') 
      })
      // 点击静音
      $mute.on('click',function(){
      	if(!$(this).attr('ov')){
      		$(this).attr('ov',audio.volume)
      	     audio.volume=0;
      	 }else{
      	 	audio.volume=$(this).attr('ov');
      	 	$(this).removeAttr('ov');
      	 }
      })



      // 调节音量
      $vre.on('click',function(e){
      	if(e.offsetX<=0){
      		e.offsetX=0
      	}
      	audio.volume=e.offsetX/w;
      })      

       //点击改变音量条的界面
      $audio.on('volumechange',function(){
      	  if(audio.volume===0){
      	  	$mute.addClass('jingyin')
      	  }else{
      	  	$mute.removeClass('jingyin')
      	  }
          $vbar.width(audio.volume*w);
          $vop.css({left:audio.volume*w-$vop.width()/2})
           
      })
	
	  $vop.on('click',function(e){
	  	  e.stopPropagation();
	  })

	  	// 音量拖动
	$('.volume-regulate .volume-op').on('mousedown',function(e){
		e.preventDefault();	
		$('.volume-regulate').addClass('moving')
		//$(this).closest('.volume-regulate').addClass('moving')
        $(document).on('mousemove',function(e){
	    // var w=(e.clientX-$('.volume-regulate').offset().left)/$('.volume-regulate').width();
	    // if( w >= 0 && w <= 1){audio.volume=w};
	    var v=(e.pageX-$('.volume-regulate').offset().left)/$('.volume-regulate').width();
	    v=(v>1)?1:v;
	    v=(v<0)?0:v;
	    audio.volume=v
	})
        $(document).on('mouseup',function(){
        	$('.volume-regulate').removeClass('moving')
        	$(document).off('mousemove')
        })

})
    


    var $bgbar=$('.player-bar .player-bg-bar');
    var $current=$('.player-bar .play-current-bar');
    var $playop=$('.player-bar .progress-op')
    var bgw=$bgbar.width();

    $bgbar.on('click',function(e){
    	audio.currentTime=(e.pageX-$(this).offset().left)/bgw*audio.duration;
    })

   
    $audio.on('timeupdate',function(){
        var ll=audio.currentTime/audio.duration*bgw;
        $current.width(ll);
        $playop.css({left:ll-$playop.width()/2})
    }) 
    //拖动
    $playop.on('mousedown',function(e){
    	e.preventDefault();
      
    	$(document).on('mousemove',function(e){
         var ww=(e.pageX-$bgbar.offset().left)/bgw*audio.duration;
         ww=ww>=audio.duration?audio.duration:ww;
         ww=ww<=0?0:ww;
         audio.currentTime=ww;
    	});
    	$(document).on('mouseup',function(){
          $(document).off('mousemove')
          $(document).off('mouseup')
    	})
    })


    



    // 获取时间的函数
     var gettime=function(time){
      if(isNaN(time)){
        return '--:--';
      };
     	var min=Math.floor(time/60);
     	var sec=parseInt(time%60);
     	if(sec<10){
     		sec='0'+sec
     	}
     	if(min<10){
     		min='0'+min
     	}
     	return min+':'+sec;
     }
    // 进度条时间
    var $show=$('.time_show');
    $bgbar.on('mouseover',function(e){
      e.preventDefault;
      $show.css('display','block')
	    var ww=e.pageX-$bgbar.offset().left;
	    $show.css({left:ww-$show.width()/2})
		    $bgbar.on('mousemove',function(e){
			    var ww=e.pageX-$bgbar.offset().left;
			    $show.css({left:ww-$show.width()/2})
			    var ct=ww/bgw*audio.duration;
			    $show.find('p').html(gettime(ct))
		    })
    })
     $bgbar.on('mouseout',function(e){
        $bgbar.off('mousemove')
        $show.css('display','none')
     })
     $playop.on('click',function(e){
	  	  e.stopPropagation();
	  })




   //展开 收起s
   $openlist=$('.open-list');
   $op2=$('.play-list .close')
   $list=$('.play-list');
   $openlist.on('click',function(){
       $list.toggleClass('shouqi')
       // setTimeout(function(){$list.css('display','none')},800)
   })
   $op2.on('click',function(){
      $list.addClass('shouqi')
   })
































})