import * as XLSX from "xlsx";
// 对象，用于调用方法
var dataConversionUtil: { [key: string]: any } = {};

// 将数据转换成Excel，单个sheet保存
//fileName文件名,tableHeader表头,dataList表数据,sheet="sheet1"工作表默认名字是sheet1
dataConversionUtil["dataToExcel"] = function (
  fileName: any,
  tableHeader: any,
  dataList: any,
  sheet = "sheet1"
) {
  // excel的表头和数据
  let aoa = [];
  // aoa的数据格式：[[],[],[],[]]   数组的第一个子数组可以指定为表头  根据情况而定
  aoa = [tableHeader].concat(dataList);
  console.log("aoa", aoa);

  let workSheet = XLSX.utils.aoa_to_sheet(aoa);
  let workBook = XLSX.utils.book_new();

  // 把数据写到工作簿中
  XLSX.utils.book_append_sheet(workBook, workSheet, sheet);
  //如果一个工作工作簿中有多个工作表，可以修改参数类型并遍历添加，期中workBook是同一个，workSheet和sheet根据自己的需求添加，
  //比如在此处添加第二个工作表叫‘第二张表’，把数据封装好后，数据格式同上,假如数据叫workSheet2，执行下面代码，工作簿就会多一张工作表叫‘第二张表’
  //XLSX.utils.book_append_sheet(workBook,workSheet2,'第二张表')

  //保存
  XLSX.writeFile(workBook, fileName + ".xlsx");
};

export { dataConversionUtil };
