interface RoomCardProps {
    slug: string;
    title: string;
    description?: string;
    createdAt: string;
}

export default function RoomCard(props: RoomCardProps) {
    const { slug, title, description, createdAt } = props;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{description || "No description provided."}</p>
            <p className="text-sm text-gray-500">Created at: {new Date(createdAt).toLocaleDateString()}</p>
            <a href={`/room/${slug}`} className="text-blue-500 hover:underline mt-2 block">
                Join Room
            </a>
        </div>
    );
}