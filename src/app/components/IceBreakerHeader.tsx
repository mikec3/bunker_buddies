'use client'
import {link} from '@/app/shared/links'
import { Button } from '@/app/components/ui/button'

const IceBreakerHeader = ({loggedIn}: {loggedIn: boolean}) => {
    console.log(loggedIn);

    const handleLogInOutButtonPressed = () => {
        if (loggedIn) {
            window.location.href=link("/user/logout")
        } else {
            window.location.href=link("/user/login")
        }
    }

    return (
            <header className="sticky top-0 z-10 bg-background border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1>Ice Breaker Questions</h1>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogInOutButtonPressed}
                >
                    {loggedIn ? 'logout' : 'login'}
                </Button>
                </div>
            </header>
    )
}

export {IceBreakerHeader}