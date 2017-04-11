import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const SPACEBAR = 32;
const ALIGNMENTS = ['center', 'right', 'left'];
const MENU_SIZES = ['sm', 'md', 'lg', 'xl'];

export default class DropdownMenu extends PureComponent {
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
		close: PropTypes.func.isRequired,
		children: PropTypes.node,
		toggle: PropTypes.node,
		align: PropTypes.oneOf(ALIGNMENTS),
		animAlign: PropTypes.oneOf(ALIGNMENTS),
		menuAlign: PropTypes.oneOf(ALIGNMENTS),
		className: PropTypes.string,
		size: PropTypes.oneOf(MENU_SIZES),
		animat: PropTypes.bool,
		enterTimeout: PropTypes.number,
		leaveTimeout: PropTypes.number,
		closeOnInsideClick: PropTypes.bool,
		closeOnOutsideClick: PropTypes.bool,
	};

	static defaultProps = {
		align: 'center',
		animAlign: null,
		menuAlign: 'left',
		className: null,
		size: null,
		animate: true,
		enterTimeout: 150,
		leaveTimeout: 150,
		closeOnInsideClick: true,
		closeOnOutsideClick: true,
	};

	static MENU_SIZES = MENU_SIZES;
	static ALIGNMENTS = ALIGNMENTS;

	componentDidUpdate(prevProps) {
		if (this.props.isOpen === prevProps.isOpen) {
			return;
		}

		const menuItems = ReactDOM.findDOMNode(this).querySelector('.dropdown-menu > .dropdown-menu-items');

		if (this.props.isOpen && !prevProps.isOpen) {
			this.lastWindowClickEvent = this.handleClickOutside;

			document.addEventListener('click', this.lastWindowClickEvent);

			if (this.props.closeOnInsideClick) {
				menuItems.addEventListener('click', this.props.close);
			}

			menuItems.addEventListener('onkeydown', this.close);
		} else if (!this.props.isOpen && prevProps.isOpen) {
			document.removeEventListener('click', this.lastWindowClickEvent);

			if (prevProps.closeOnInsideClick) {
				menuItems.removeEventListener('click', this.props.close);
			}

			menuItems.removeEventListener('onkeydown', this.close);

			this.lastWindowClickEvent = null;
		}
	}

	componentWillUnmount() {
		if (this.lastWindowClickEvent) {
			document.removeEventListener('click', this.lastWindowClickEvent);
		}
	}

	close = (e) => {
		const key = e.which || e.keyCode;

		if (key === SPACEBAR) {
			this.props.close();
			e.preventDefault();
		}
	};

	handleClickOutside = (e) => {
		if (!this.props.closeOnOutsideClick) {
			return;
		}

		const node = ReactDOM.findDOMNode(this);
		let target = e.target;

		while (target.parentNode) {
			if (target === node) {
				return;
			}

			target = target.parentNode;
		} 

		this.props.close(e);
	};

	render() {
		const { menuAlign, size, className } = this.props;

		const menuClassName = classnames(
			'dropdown-menu',
			`dropdown-menu-${menuAlign}`,
			className,
			size ? (`dropdown-menu-${size}`) : null,
		);

		const { animAlign, animate, enterTimeout, leaveTimeout } = this.props;
		
		const transitionProps = {
			transitionName: `grow-from-${animAlign}`,
			component: 'div',
			className: classnames('dropdown-menu-items'),
			transitionEnter: animate,
			transitionLeave: animate,
			transitionEnterTimeout: enterTimeout,
			transitionLeaveTimeout: leaveTimeout,
		};

		return (
			<div className={menuClassName}>
				{this.props.toggle}
				<CSSTransitionGroup {...transitionProps}>
					{this.props.isOpen &&
						<ul key="items" className={'dropdown-menu-items'}>{this.props.children}</ul>
					}
				</CSSTransitionGroup>
			</div>
		);
	}
}