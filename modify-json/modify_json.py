# 为特定字段名的值添加后缀

import json

# 读取 JSON 文件
def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# 写入 JSON 文件
def write_json_file(file_path, data):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# 修改所有 "name" 字段的值
def add_suffix_to_names(data, suffix='-filled'):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'name' and isinstance(value, str):
                data[key] += suffix
            elif isinstance(value, (dict, list)):
                add_suffix_to_names(value, suffix)
    elif isinstance(data, list):
        for item in data:
            add_suffix_to_names(item, suffix)

# 主程序
def main():
    input_file = 'input.json'  # 输入的 JSON 文件路径
    output_file = 'output.json'  # 输出的 JSON 文件路径

    # 读取数据
    print(f"Reading from {input_file}...")
    data = read_json_file(input_file)
    print("Data read successfully:", data)

    # 修改数据
    print("Modifying names...")
    add_suffix_to_names(data)
    print("Modification complete.")

    # 写入修改后的数据
    print(f"Writing to {output_file}...")
    write_json_file(output_file, data)
    print("Write complete.")

if __name__ == '__main__':
    main()
