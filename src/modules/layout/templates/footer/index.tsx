import FooterNav from "@modules/layout/components/footer-nav"

const Footer = ({ dark }: { dark: boolean; }) => {
  return (
    <footer className={dark ? 'bg-slate-800 text-white' : ''}>
      <FooterNav />
    </footer>
  )
}

export default Footer
