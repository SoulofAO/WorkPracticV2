import os
import re



def remove_russian_comments(file_content):
    # Удаляем русские комментарии
    # Предполагается, что комментарии начинаются с '#' или '//'
    # Учитываем, что комментарии могут содержать русский текст
    return re.sub(r'(#.*?[а-яА-ЯёЁ].*?|\s*//.*?[а-яА-ЯёЁ].*?)(?=\n)', '', file_content, flags=re.MULTILINE)

def convert_to_utf8_and_remove_comments(input_dir, output_dir):
    # Проходим по всем файлам в директории
    for root, _, files in os.walk(input_dir):
        for file in files:
            # Игнорируем временные файлы и каталоги
            if file.endswith('.vsidx') or '.vs' in root:
                continue

            input_file_path = os.path.join(root, file)

            # Определяем относительный путь к файлу от входной директории
            relative_path = os.path.relpath(input_file_path, input_dir)
            output_file_path = os.path.join(output_dir, relative_path)

            # Создаем необходимые директории в выходной папке
            os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

            try:
                with open(input_file_path, 'r', encoding='windows-1251') as f:
                    content = f.read()

                modified_content = remove_russian_comments(content)

                with open(output_file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_content)

            except PermissionError as e:
                print(f"Пропущен файл {input_file_path}: {e}")
            except Exception as e:
                print(f"Ошибка при обработке файла {input_file_path}: {e}")

if __name__ == "__main__":
    current_file_path = os.path.abspath(__file__)
    project_path = os.path.dirname(current_file_path)
    project_path = os.path.dirname(project_path)
    input_directory = project_path + "/ReactApplication"
    output_directory = project_path + "/NewReactApplication"

    convert_to_utf8_and_remove_comments(input_directory, output_directory)