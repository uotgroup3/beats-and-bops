function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();
}

document.getElementById("upload").addEventListener("change", handleFiles, false);

window.onload = () =>{
    var visualizer = new Visualiser();
    
    window.onresize = () => {
      visualizer.resize();
    }
  }