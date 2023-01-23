import classNames from 'classnames'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import headerStyles from './header.module.css'

function Header() {
  console.log('Render Header')

	// система ссылок роутинга
  return (
    <header className={headerStyles.wr}>
			<nav>
				<ul className={headerStyles.headerMenu}>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="/">Home</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="/contacts">Contacts</NavLink>
					</li>
					<li>
						<NavLink className={({isActive}) => classNames({[headerStyles.activeLink]: isActive})} to="/todos">Todos</NavLink>
					</li>
				</ul>
			</nav>
    </header>
  )
}

export const HeaderMemo = memo(Header)