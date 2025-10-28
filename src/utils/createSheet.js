import * as XLSX from "xlsx";
export function exportToExcel(data) {
  // 1. 将数据转换为工作表（Sheet）
  const ws = XLSX.utils.json_to_sheet(data);
  
  // 2. 创建工作簿（Workbook）并添加工作表
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
  // 3. 导出为 Excel 文件
  XLSX.writeFile(wb, "表格数据.xlsx");
}