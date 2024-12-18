document.addEventListener('DOMContentLoaded', function() {
    // 从localStorage加载已保存的设置
    loadSettings();

    // 处理轮播图表单提交
    document.getElementById('carouselForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const settings = {
            carousel: [
                {
                    img: formData.get('carousel1_img'),
                    link: formData.get('carousel1_link')
                },
                {
                    img: formData.get('carousel2_img'),
                    link: formData.get('carousel2_link')
                },
                {
                    img: formData.get('carousel3_img'),
                    link: formData.get('carousel3_link')
                }
            ]
        };
        localStorage.setItem('carouselSettings', JSON.stringify(settings));
        alert('轮播图设置已保存');
    });

    // 处理精选游戏表单提交
    document.getElementById('featuredForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const settings = {
            featured: [
                {
                    img: formData.get('featured1_img'),
                    link: formData.get('featured1_link')
                },
                {
                    img: formData.get('featured2_img'),
                    link: formData.get('featured2_link')
                },
                {
                    img: formData.get('featured3_img'),
                    link: formData.get('featured3_link')
                },
                {
                    img: formData.get('featured4_img'),
                    link: formData.get('featured4_link')
                }
            ]
        };
        localStorage.setItem('featuredSettings', JSON.stringify(settings));
        alert('精选游戏设置已保存');
    });

    // 处理折扣游戏表单提交
    document.getElementById('discountForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const settings = {
            discount: [
                {
                    img: formData.get('discount1_img'),
                    link: formData.get('discount1_link'),
                    title: formData.get('discount1_title')
                },
                {
                    img: formData.get('discount2_img'),
                    link: formData.get('discount2_link'),
                    title: formData.get('discount2_title')
                },
                {
                    img: formData.get('discount3_img'),
                    link: formData.get('discount3_link'),
                    title: formData.get('discount3_title')
                }
            ]
        };
        localStorage.setItem('discountSettings', JSON.stringify(settings));
        alert('折扣游戏设置已保存');
    });

    // 处理免费游戏表单提交
    document.getElementById('freeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const settings = {
            free: [
                {
                    img: formData.get('free1_img'),
                    link: formData.get('free1_link'),
                    title: formData.get('free1_title')
                },
                {
                    img: formData.get('free2_img'),
                    link: formData.get('free2_link'),
                    title: formData.get('free2_title')
                },
                {
                    img: formData.get('free3_img'),
                    link: formData.get('free3_link'),
                    title: formData.get('free3_title')
                }
            ]
        };
        localStorage.setItem('freeSettings', JSON.stringify(settings));
        alert('免费游戏设置已保存');
    });
});

function loadSettings() {
    // 定义默认的轮播图设置
    const defaultCarouselSettings = {
        carousel: [
            {
                img: "../Img/Game Img/Showgame/SRCX.jpg",
                link: "#"
            },
            {
                img: "../Img/Game Img/Showgame/JH.jpg",
                link: "#"
            },
            {
                img: "../Img/Game Img/Showgame/ARK.jpg",
                link: "#"
            }
        ]
    };

    // 定义默认的精选游戏设置
    const defaultFeaturedSettings = {
        featured: [
            {
                img: "../Img/Game Img/Showgame/2k25.jpg",
                link: "#"
            },
            {
                img: "../Img/Game Img/Showgame/WS3.jpg",
                link: "#"
            },
            {
                img: "../Img/Game Img/Showgame/HSPL.jpg",
                link: "#"
            },
            {
                img: "../Img/Game Img/Showgame/ZD5.jpg",
                link: "#"
            }
        ]
    };

    // 定义默认的折扣游戏设置
    const defaultDiscountSettings = {
        discount: [
            {
                img: "../Img/Game Img/Discount/Manor-lords.jpg",
                link: "#",
                title: "《庄园领主》"
            },
            {
                img: "../Img/Game Img/Discount/Assassings-origins.jpg",
                link: "#",
                title: "《刺客信条：起源》"
            },
            {
                img: "../Img/Game Img/Discount/Party-animals.jpg",
                link: "#",
                title: "《动物派对》"
            }
        ]
    };

    // 定义默认的免费游戏设置
    const defaultFreeSettings = {
        free: [
            {
                img: "../Img/Game Img/Freegame/2077Ultimate.jpg",
                link: "#",
                title: "《赛博朋克 2077：终极版》"
            },
            {
                img: "../Img/Game Img/Freegame/black-myth-wukong-wbmqz.avif",
                link: "#",
                title: "《黑神话：悟空》"
            },
            {
                img: "../Img/Game Img/Freegame/Red Dead Redemption 2.png",
                link: "#",
                title: "《Red Dead Redemption 2》"
            }
        ]
    };

    // 加载轮播图设置（如果localStorage中没有，则使用默认值）
    const carouselSettings = JSON.parse(localStorage.getItem('carouselSettings')) || defaultCarouselSettings;
    carouselSettings.carousel.forEach((item, index) => {
        document.querySelector(`[name="carousel${index+1}_img"]`).value = item.img;
        document.querySelector(`[name="carousel${index+1}_link"]`).value = item.link;
    });

    // 加载精选游戏设置（如果localStorage中没有，则使用默认值）
    const featuredSettings = JSON.parse(localStorage.getItem('featuredSettings')) || defaultFeaturedSettings;
    featuredSettings.featured.forEach((item, index) => {
        document.querySelector(`[name="featured${index+1}_img"]`).value = item.img;
        document.querySelector(`[name="featured${index+1}_link"]`).value = item.link;
    });

    // 加载折扣游戏设置
    const discountSettings = JSON.parse(localStorage.getItem('discountSettings')) || defaultDiscountSettings;
    discountSettings.discount.forEach((item, index) => {
        document.querySelector(`[name="discount${index+1}_img"]`).value = item.img;
        document.querySelector(`[name="discount${index+1}_link"]`).value = item.link;
        document.querySelector(`[name="discount${index+1}_title"]`).value = item.title;
    });

    // 加载免费游戏设置
    const freeSettings = JSON.parse(localStorage.getItem('freeSettings')) || defaultFreeSettings;
    freeSettings.free.forEach((item, index) => {
        document.querySelector(`[name="free${index+1}_img"]`).value = item.img;
        document.querySelector(`[name="free${index+1}_link"]`).value = item.link;
        document.querySelector(`[name="free${index+1}_title"]`).value = item.title;
    });
}
