type CategoryTabProps = {
  category: string;
};
const CategoryTab = ({ category }: CategoryTabProps) => {
  return (
    <div className="bg-light-2 rounded-full px-3 py-1 text-[13px]">
      {category}
    </div>
  );
};
export default CategoryTab;
