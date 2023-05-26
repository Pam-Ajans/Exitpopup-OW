$(document).ready(function () {
    var exitIntentDetected = false;

    $(document).mousemove(function (e) {
        if (e.clientY <= 5) {
            if (!exitIntentDetected) {
                showModal();
            }
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden && !exitIntentDetected) {
            showModal();
        }
    });

    $(".pamModal-close").click(function () {
        $('.pamModal').hide();
    });

    function showModal() {
        var today = new Date();
        var dateString = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var hasSeenModal = localStorage.getItem(dateString);

        if (hasSeenModal !== null) {
            return;
        }

        exitIntentDetected = true;
        var templateTab = $("#PamAjansProducts").html();
        $.get("/Templates/100/Urun/UrunItem.html", function (data) {
            Handlebars.registerPartial("productItemPam", data);
            var filterModel = createProductFilterModel();
            filterModel.filter.CategoryIdList.push(68);
            filterModel.paging.PageItemCount = 10;
            createProductDiv(1, filterModel, templateTab, "PamBestSellerProductList");
            $('.pamModal').css('display', 'flex');

            setTimeout(function () {
                $("ul.ulProductSliderPam").owlCarousel({
                    loop: false,
                    nav: true,
                    dots: false,
                    autoplay: false,
                    items: 4,
                    responsive: {
                        0: {
                            items: 2
                        },
                        900: {
                            items: 3
                        },
                        1200: {
                            items: 4
                        }
                    }
                });

                $("img.lazyImage").each(function () {
                    $(this).attr("src", $(this).data("original"));
                });
            }, 200);

        });

        localStorage.setItem(dateString, 'true');
    }

    $(".pamModal-close").click(function () {
        $('.pamModal').hide();
    });
});