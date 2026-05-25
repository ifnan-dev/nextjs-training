// user card
export type UserCardProps = {
  id: number;
  name: string;
  company: {
    name: string;
  };
};

export default function UserCard({ id, name, company }: UserCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
      <p className="text-gray-600">{company.name}</p>
      <p className="text-gray-500">{name}</p>
    </div>
  );
}
