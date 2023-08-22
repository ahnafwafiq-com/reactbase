interface Props {
    collectionId: string;
    isEditing: boolean;
}

function EditCollection({ isEditing }: Props) {
    return <dialog open={isEditing}></dialog>;
}

export default EditCollection;
