import time
import unittest
import requests  # Asegúrate de importar requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

class MyProjectTest(unittest.TestCase):
    def setUp(self):
        chromedriver_path = r"C:\Users\dfern\OneDrive\Escritorio\chromedriver.exe"
        service = Service(chromedriver_path)
        self.driver = webdriver.Chrome(service=service)

    def test_Validatelogin(self): #Test 1 verificar que la ruta funcione
        url = "http://localhost:3000/"
        
        response = requests.get(url)
        self.assertEqual(response.status_code, 200, "No se pudo acceder al link.")
        
        self.driver.get(url)
        time.sleep(3)  # Espera 3 segundos para observar los resultados

    def test_login(self):
        self.driver.get("http://localhost:3000/")

        name_input = self.driver.find_element(By.CSS_SELECTOR, 'input[type="text"]')
        password_input = self.driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
        submit_button = self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')

        name_input.send_keys("david")  
        password_input.send_keys("1234")  

        submit_button.click()

        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/authenticated")  # Verifica que la URL contenga "/authenticated"
        )
    def test_login_with_invalid_user(self):
        self.driver.get("http://localhost:3000/")

        initial_url = self.driver.current_url
        name_input = self.driver.find_element(By.CSS_SELECTOR, 'input[type="text"]')
        password_input = self.driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
        submit_button = self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')

        name_input.send_keys("InvalidUser")  
        password_input.send_keys("402")  

        submit_button.click()

        # Esperar a que aparezca el mensaje de error en la página
        WebDriverWait(self.driver, 4).until(
            EC.url_to_be(initial_url)
        )

        # Obtener la URL actual después del clic
        current_url = self.driver.current_url
    
        # Verificar si la URL sigue siendo la misma
        self.assertEqual(initial_url, current_url, "Error: The URL changed unexpectedly, login might have succeeded incorrectly.")


    def test_logout(self):
        self.driver.get("http://localhost:3000/authenticated")  # Asegúrate de que el usuario esté autenticado
        time.sleep(3)
        # Localiza el botón de "Cerrar sesión"
        logout_button = self.driver.find_element(By.CLASS_NAME, 'regreso')  # Asegúrate de que la clase del botón sea correcta

        # Haz clic en el botón de "Cerrar sesión"
        logout_button.click()

        # Espera hasta que la URL contenga "/"
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/")  # Verifica que la URL contenga "/"
        )

        current_url = self.driver.current_url
        self.assertIn("/", current_url)  # Verifica que la URL actual contenga "/"
        # Espera 3 segundos antes de continuar
        time.sleep(3)


    def tearDown(self):
        self.driver.quit()

# Ejecuta la prueba directamente en Jupyter
suite = unittest.TestLoader().loadTestsFromTestCase(MyProjectTest)
unittest.TextTestRunner().run(suite)