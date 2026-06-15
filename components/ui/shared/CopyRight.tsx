export default function CopyRight() {
  return (
    <div className="flex items-center justify-center py-6">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Synthora AI Labs. All rights reserved.
      </p>
    </div>
  )
}
