var tooltips  = {};
var sortDropdown  = {};

class popoverTooltip {
    constructor() {
        this.popperInstance = null;
        this.tooltipBodyTimeout = null;
        this.bind();
    }

    mouseEnterHandler(e) {
        let el = e.currentTarget;
        if (!$('.popper-tips').length) {
            $('body').append('<div class="popper-tips"></div>');
        }
        if ($(el).attr('data-tooltip')) {
            $('.popper-tips').text($(el).attr('data-tooltip'));
        }
        if ($(el).attr('data-tooltip-id')) {
            console.log($(el).attr('data-tooltip-id'))
            $('.popper-tips').html($('#'+$(el).attr('data-tooltip-id')).html());
        }

        $('.popper-tips').attr('data-show', '');

        if (this.popperInstance) {
            this.popperInstance.destroy();
            $('.popper-tips').removeAttr('data-show');
            this.popperInstance = null;
        } else {
            this.createFilterTooltip(el, $('.popper-tips')[0]);
        }

    }
    mouseLeaveHandler () {
        if (this.popperInstance) {
            this.tooltipBodyTimeout = setTimeout(this.destroyTooltip(), 100);
        }
    }
    destroyTooltip () {
        this.popperInstance.destroy();
        $('.popper-tips').removeAttr('data-show');
        this.popperInstance = null;
    }

    bind() {
        $(document).on('mouseenter','.js--open-tooltip',this.mouseEnterHandler.bind(this));
        $(document).on('mouseleave','.js--open-tooltip', this.mouseLeaveHandler.bind(this));
    }
    createFilterTooltip(button, dropdown) {

        this.popperInstance = Popper.createPopper(button, dropdown, {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 12],
                    },
                },
            ],
        });
    }
}


class sortigDropdown {
    constructor() {
        this.popperInstance = null;
        this.tooltipBodyTimeout = null;
        this.bind();

    }

    mouseEnterHandler(e) {
        let el = e.currentTarget;
        let $dropdown = $(el).closest('.pager-toolbar-sort').find('.pager-sort-dropdown');
        let isOpen = ($dropdown.is('[data-show]')) ? true : false;
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
            $('.pager-sort-dropdown').removeAttr('data-show');
            $('.pager-toolbar-sort__link').removeClass('pager-toolbar-sort__link_open');
        }

        if (!isOpen) {
            $(el).addClass('pager-toolbar-sort__link_open');
            $dropdown.attr('data-show', '');
            this.createFilterTooltip(el, $dropdown[0]);
        }
        return false;

    }
    mouseLeaveHandler () {
        if (this.popperInstance) {
            this.tooltipBodyTimeout = setTimeout(this.destroyTooltip(), 100);
        }
    }
    hideAllClickHandler(e) {
        var div = $('.pager-toolbar-sort');
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.js--pager-sort-dropdown').removeClass('pager-toolbar-sort__link_open');
            if (this.popperInstance) {
                this.popperInstance.destroy();
                $('.pager-sort-dropdown').removeAttr('data-show');
                this.popperInstance = null;
            }
        } else {
            return false;
        }
    }

    destroyTooltip () {
        this.popperInstance.destroy();
        $('.pager-sort-dropdown').removeAttr('data-show');
        this.popperInstance = null;
    }



    bind() {
        $(document).on('touchstart click','.js--pager-sort-dropdown',this.mouseEnterHandler.bind(this));
        $(document).on('touchend mouseup', this.hideAllClickHandler.bind(this));
    }
    createFilterTooltip(button, dropdown) {

        this.popperInstance = Popper.createPopper(button, dropdown, {
            placement: 'bottom-start',
            modifiers: [
                {

                    name: 'offset',
                    options: {
                        offset: [-20, 12],
                    },
                },
            ],
        });
    }
}


$(document).ready(function() {
    tooltips = new popoverTooltip();
    sortDropdown = new sortigDropdown();
})
