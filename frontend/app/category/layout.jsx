import AdminPanel from '@/components/adminPanel'

const layout = ({children}) => {
    return (
        <div>
            <AdminPanel pageName="Category">
                {children}
            </AdminPanel>
        </div>
    )
}

export default layout