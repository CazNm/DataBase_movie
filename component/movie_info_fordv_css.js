const movie_info_frozen_css=()=>{
    return(
        <style global jsx>{`
        body{
          margin: 0;
        }

        .movie_info {
          text-align: center;
          margin-top: -15px;
          width: 100%;
          background-color: #F6EAEA;
          height: 330px;
        }
        a
        .info h1 {
          // float: left;
          text-align: left;
          margin-top: 20px;
          margin-left: 100px;
          margin-bottom: 10px;
          font-size: 2em;
          color: #343B40;
        }
        
        .info {
          width: 70%;
          /* background-color: white; */
          display: inline-block;
        }
        
        .movie_info img {
          width: 150px;
          float: left;
          margin-left: 100px;
        }
        
        .title {
          float: left;
          margin-left: 20px;
          width: 500px;
          font-size: 0;
        }
        
        .movie_name {
          text-align: left;
          margin-left: 15px;
          font-size: 20px;
          display: block;
        }
        
        .ticketing_rate {
          text-align: left;
          margin-left: 15px;
          margin-top: -15px;
          margin-bottom: 5px;
          font-size: 15px;
        }
        
        .title img {
          margin-left: 5px;
          width: 130%;
        }
        .info_director {
          font-size: 15px;
          text-align: left;
          margin-top: 20px;
          margin-left: 15px;
          /* margin-bottom: -5px; */
        }
        .info_actor {
          font-size: 15px;
          text-align: left;
          margin-left: 15px;
          margin-top: -10px;
        }
        .info_genre {
          font-size: 15px;
          text-align: left;
          margin-left: 15px;
          margin-top: -10px;
        }
        .release_date {
          font-size: 15px;
          text-align: left;
          margin-left: 15px;
          margin-top: -10px;
        }
        
        .summary_container {
          text-align: center;
        }
        
        .summary {
          display: inline-block;
          width: 70%;
        }
        
        .summary h1 {
          text-align: left;
          margin-top: 20px;
          margin-left: 100px;
          margin-bottom: 10px;
          font-size: 2em;
          color: #343B40;
        }
        
        .summary div {
          text-align: left;
          margin-top: 20px;
          margin-left: 130px;
          margin-bottom: 10px;
          font-size: 1em;
          color: #343B40;
          line-height: 150%;
        }
        
        .photo_container {
          text-align: center;
        }
        
        .photo {
          display: inline-block;
          width: 70%;
        }
        
        .photo h1 {
          text-align: left;
          margin-top: 50px;
          margin-left: 100px;
          margin-bottom: -50px;
          font-size: 2em;
          color: #343B40;
        }
        
        @import url(https://fonts.googleapis.com/css?family=Varela+Round);
        
        .slides {
          padding: 0;
          width: 609px;
          height: 420px;
          display: block;
          margin: 0 auto;
          position: relative;
          margin-top: 70px;
        }
        
        .slides * {
          user-select: none;
          -ms-user-select: none;
          -moz-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
        }
        
        .slides input { display: none; }
        
        .slide-container {
          display: block;
        }
        
        .slide {
          top: 0;
          opacity: 0;
          width: 609px;
          height: 420px;
          display: block;
          position: absolute;
        
          transform: scale(0);
        
          transition: all .7s ease-in-out;
        }
        
        .slide img {
          width: 100%;
          height: 100%;
        }
        
        .nav label {
          width: 200px;
          height: 100%;
          display: none;
          position: absolute;
        
          opacity: 0;
          z-index: 9;
          cursor: pointer;
        
          transition: opacity .2s;
        
          color: #FFF;
          font-size: 156pt;
          text-align: center;
          line-height: 380px;
          font-family: "Varela Round", sans-serif;
          background-color: rgba(255, 255, 255, .3);
          text-shadow: 0px 0px 15px rgb(119, 119, 119);
        }
        
        .slide:hover + .nav label { opacity: 0.5; }
        
        .nav label:hover { opacity: 1; }
        
        .nav .next { right: 0; }
        
        input:checked + .slide-container  .slide {
          opacity: 1;
        
          transform: scale(1);
        
          transition: opacity 1s ease-in-out;
        }
        
        input:checked + .slide-container .nav label { display: block; }
        
        .nav-dots {
         width: 100%;
         bottom: 9px;
         height: 11px;
         display: block;
         position: absolute;
         text-align: center;
        }
        
        .nav-dots .nav-dot {
         top: -5px;
         width: 11px;
         height: 11px;
         margin: 0 4px;
         position: relative;
         border-radius: 100%;
         display: inline-block;
         background-color: rgba(0, 0, 0, 0.6);
        }
        
        .nav-dots .nav-dot:hover {
         cursor: pointer;
         background-color: rgba(0, 0, 0, 0.8);
        }
        
        input#img-1:checked ~ .nav-dots label#img-dot-1,
        input#img-2:checked ~ .nav-dots label#img-dot-2,
        input#img-3:checked ~ .nav-dots label#img-dot-3,
        input#img-4:checked ~ .nav-dots label#img-dot-4,
        input#img-5:checked ~ .nav-dots label#img-dot-5,
        input#img-6:checked ~ .nav-dots label#img-dot-6 {
         background: rgba(0, 0, 0, 0.8);
        }
        
        .comments_container {
          text-align: center;
        }
        
        .comments {
          display: inline-block;
          width: 70%;
        }
        
        .comments h1 {
          text-align: left;
          margin-top: 50px;
          margin-left: 100px;
          margin-bottom: -50px;
          font-size: 2em;
          color: #343B40;
        }
        

          `}</style>
        )
    }   
    export default movie_info_frozen_css