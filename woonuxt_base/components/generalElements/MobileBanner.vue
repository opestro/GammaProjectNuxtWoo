<template>
    <div>
        <div class="carousel w-full rounded-xl">
            <div id="slide1" class="carousel-item relative w-full">
              <img src="../../static/images/unnamed.webp" class="w-full" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" class="btn bg-amber-500 btn-ghost">❮</a> 
                <a href="#slide2" class="btn bg-amber-500 btn-ghost">❯</a> 
              </div>
            </div> 
            <div id="slide2" class="carousel-item relative w-full">
              <img src="../../static/images/unnamed.webp" class="w-full" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn bg-amber-500 btn-ghost">❮</a> 
                <a href="#slide3" class="btn bg-amber-500 btn-ghost">❯</a> 
              </div>
            </div> 
            <div id="slide3" class="carousel-item relative w-full">
              <img src="../../static/images/unnamed.webp" class="w-full" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" class="btn bg-amber-500 btn-ghost">❮</a> 
                <a href="#slide4" class="btn bg-amber-500 btn-ghost">❯</a> 
              </div>
            </div> 
            <div id="slide4" class="carousel-item relative w-full">
              <img src="../../static/images/unnamed.webp" class="w-full" />
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" class="btn bg-amber-500 btn-ghost">❮</a> 
                <a href="#slide1" class="btn bg-amber-500 btn-ghost">❯</a> 
              </div>
            </div>
          </div>
    </div>
</template>