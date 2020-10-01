define([
    'jquery',
], function ($) {
    'use strict';

    function initSvg() {
        // Convert img to svg
        $('img.svg').each(function () {
            let $img = $(this);
            let imgID = $img.attr('id');
            let imgClass = $img.attr('class');
            let imgURL = $img.attr('src');
            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                let $svg = $(data).find('svg');
                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg.removeAttr('xmlns:a');
                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                }
                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    }

    // Cookie Functions
    function readCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
    }

    function createCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    // End - Cookie Functions


    // Check user agent
    let isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone|webOS|Mobile/i.test(navigator.userAgent);
    let isDesktop = /Windows NT|Macintosh|Ubuntu/i.test(navigator.userAgent);
    console.log(navigator.userAgent);


    $(document).ready(function () {
        let _body = $('body');

        // Init SVG file
        initSvg();

    });

});
