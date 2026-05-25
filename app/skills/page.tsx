import UserCard from "@/components/UserCard";
import { UserCardProps } from "@/components/UserCard";

export default async function SkillsPage() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: UserCardProps[] = await res.json();
    return (
        <div className="flex items-center justify-center min-h-screen flex-col">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Popular Skills</h1>
            <div>
                {users.map(user => (
                    <UserCard key={user.id} {...user} />
                ))}
            </div>
        </div>
    );
}