GitHub.TreeSlider = function() {
    if (!Modernizr.history)
        return;
    if ($("#slider").length == 0)
        return;
    var a = this;
    a.enabled = !0, $("#slider a.js-slide-to, .breadcrumb a").live("click", function(b) {
        return a.clickHandler(b)
    }), $(window).bind("popstate", function(b) {
        a.popStateHandler(b.originalEvent)
    })
}, GitHub.TreeSlider.prototype = {enabled: !1,sliding: !1,slideSpeed: 400,frameForPath: function(a) {
        return $('.frame[data-path="' + a + '"]')
    },frameForURL: function(a) {
        return this.frameForPath(this.pathFromURL(a))
    },pathFromURL: function(a) {
        if (!a)
            return;
        var b = $(" .repo-tree").attr("data-ref"), c = new RegExp("/(tree|blob)/" + (b || "[^/]+") + "/"), d = a.split(c)[2] || "/";
        return d.slice(d.length - 1, d.length) != "/" && (d += "/"), unescape(d)
    },scrollToBreadcrumb: function() {
        this.visibleInBrowser(".breadcrumb:visible") || $(".breadcrumb:visible").scrollTo(50)
    },visibleInBrowser: function(a) {
        var b = $(window).scrollTop(), c = b + $(window).height(), d = $(a).offset().top, e = d + $(a).height();
        return e >= b && d <= c
    },popStateHandler: function(a) {
        this.slideTo(location.pathname)
    },doneSliding: function() {
        $("#slider").trigger("pageUpdate");
        if (!this.sliding)
            return;
        this.sliding = !1, $("#slider .frame-center").nextAll(".frame").hide(), $("#slider .frame-center").prevAll(".frame").css("visibility", "hidden");
        var a = $(".frame-loading:visible");
        a.length ? a.removeClass("frame-loading") : $("#slider").trigger("slid")
    },slideTo: function(a) {
        var b = this.pathFromURL(a), c = this.frameForPath(b), d = $("#slider .frame-center").attr("data-path") || "";
        c.is(".frame-center") || (d == "/" || b.split("/").length > d.split("/").length ? this.slideForwardTo(a) : this.slideBackTo(a))
    },slideForwardTo: function(a) {
        debug("Sliding forward to %s", a);
        var b = this.frameForURL(a);
        if (b.length)
            this.slideForwardToFrame(b);
        else {
            var c = this.slideForwardToLoading();
            this.loadFrame(a, function(a) {
                c.replaceWith($(a).find(".frame-center"))
            })
        }
    },slideForwardToFrame: function(a) {
        if (this.sliding)
            return;
        this.sliding = !0;
        var b = this;
        $("#slider .frame-center").after(a.css("marginLeft", 0)).addClass("frame").removeClass("frame-center").animate({marginLeft: "-1200px"}, this.slideSpeed, function() {
            b.doneSliding()
        }), this.makeCenterFrame(a), this.setFrameTitle(a), this.setFrameCanonicalURL(a)
    },slideForwardToLoading: function() {
        var a = $(".frame-loading").clone();
        return a.find("img").hide(), setTimeout(function() {
            a.find("img").show()
        }, 500), $(".frames").append(a), this.slideForwardToFrame(a), a
    },slideBackTo: function(a) {
        debug("Sliding back to %s", a);
        var b = this.frameForURL(a);
        if (b.length)
            this.slideBackToFrame(b);
        else {
            var c = this.slideBackToLoading(), d = this.pathFromURL(a);
            this.loadFrame(a, function(a) {
                var b = $(a).find(".frame-center");
                c.replaceWith(b)
            })
        }
    },slideBackToFrame: function(a) {
        if (this.sliding)
            return;
        this.sliding = !0, $("#slider .frame-center").before(a.css("marginLeft", "-1200px")).addClass("frame").removeClass("frame-center");
        var b = this;
        a.animate({marginLeft: "0"}, this.slideSpeed, function() {
            b.doneSliding()
        }), this.makeCenterFrame(a), this.setFrameTitle(a), this.setFrameCanonicalURL(a)
    },slideBackToLoading: function() {
        var a = $(".frame-loading").clone();
        return a.find("img").hide(), setTimeout(function() {
            a.find("img").show()
        }, 350), $(".frames").prepend(a.show()), slider.slideBackToFrame(a), a
    },makeCenterFrame: function(a) {
        a.css("visibility", "visible").show().addClass("frame-center"), this.scrollToBreadcrumb();
        var b = $('.breadcrumb[data-path="' + a.attr("data-path") + '"]');
        b.length > 0 && ($(".breadcrumb:visible").hide(), b.show());
        var c = $('.announce[data-path="' + a.attr("data-path") + '"]');
        $(".announce").fadeOut(), c.length > 0 && c.fadeIn();
        var d = $(".js-ufo[data-path=" + a.attr("data-path") + "]");
        $(".js-ufo").fadeOut(), d.length > 0 && d.fadeIn()
    },setFrameTitle: function(a) {
        var b = a.attr("data-title");
        b && (document.title = b)
    },setFrameCanonicalURL: function(a) {
        var b = a.attr("data-permalink-url");
        b && $("link[rel=permalink]").attr("href", b)
    },loadFrame: function(a, b) {
        debug("Loading " + a + "?slide=1");
        var c = this;
        $.ajax({url: a + "?slide=1",cache: !1,success: function(d) {
                b.call(this, d), $("#slider").trigger("slid"), $("#slider .breadcrumb").hide().last().after($(d).find(".breadcrumb")), $("#slider .breadcrumb").trigger("pageUpdate");
                var e = c.frameForURL(a);
                e.trigger("pageUpdate"), GitHub.CachedCommitDataPoller(50, e), GitHub.Blob.show(), c.setFrameTitle(e), c.setFrameCanonicalURL(e)
            },error: function() {
                $("#slider .frame-center").html("<h3>Something went wrong.</h3>")
            },complete: function() {
                c.sliding = !1
            }})
    }}, $(function() {
    window.slider = new GitHub.TreeSlider
})
	
/*
#slider {
	position:relative;
	overflow:hidden;
}
#slider .frames {
	width:10000px;
}
#slider .frames .frame {
	float:left;
	width:920px;
	margin-right:100px;
}
#slider .frames .frame-loading {
	height:100%;
}
#files .file {
	margin-top:0;
}
#slider .frames .big-actions {
	position:absolute;
	top:5px;
	right:0;
	margin:0;
}
*/